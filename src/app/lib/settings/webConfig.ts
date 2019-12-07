// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

import * as yup from 'yup';

const webConfig = yup.object().shape({
    defaultLocale: yup.string().notRequired(),
    defaultNetwork: yup.string().notRequired(),
    networks: yup.array().of(yup.object({
        key: yup.string().required(),
        name: yup.string().required(),
        networkID: yup.number().required(),
        fullNodes: yup.array().of(yup.string()).required().min(1),
        socketUrl: yup.string().notRequired(),
        txViewerUrl: yup.string().notRequired(),
        activationEmail: yup.string().email().notRequired().default('luxembourg@apla.io'),
        activationUrl: yup.string().url().notRequired().default('https://lhoft.apla.io/request/add'),
        enableDemoMode: yup.bool(),
        disableSync: yup.bool(),

    })).test('ValidationError', params => `${params.path}[x].key must be unique`, function (value: any[]) {
        const unique = value.filter((element, index, self) => {
            return self.findIndex(subElement => subElement.key === element.key) === index;
        });
        return unique.length === value.length;
    })
});

export default webConfig;