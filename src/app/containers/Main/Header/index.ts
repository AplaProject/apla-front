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

import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { generateRoute } from 'services/router';

import MainHeader from 'components/Main/Header';

const mapStateToProps = (
    state: IRootState,
    props: {
        app?: string;
        section?: string;
    }
) => {
    if ('browse' !== props.app) {
        return {};
    }

    const section = state.sections.sections[props.section];

    if (!section) {
        return {};
    }

    const crumbs = section.breadcrumbs;

    if (crumbs.length <= 1) {
        return {};
    }

    const link = crumbs[crumbs.length - 1];
    return {
        returnUrl:
            crumbs.length === 2
                ? '/browse/home/default_page'
                : generateRoute(
                      `/browse/${props.section}/${link.page}`,
                      link.params
                  )
    };
};

export default connect(mapStateToProps, {})(MainHeader);
