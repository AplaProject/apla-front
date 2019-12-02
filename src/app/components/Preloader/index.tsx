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

import React from 'react';
import themed from 'components/Theme/themed';

interface Props {
    className?: string;
    pending: boolean;
}

const Preloader: React.SFC<Props> = props =>
    props.pending ? (
        <div className={props.className}>
            <div>
                <img src="/img/preloader.gif" />
                <div>Please wait...</div>
            </div>
        </div>
    ) : null;

export default themed(Preloader)`
    text-align: center;
    background: rgba(103, 100, 95, 0.3);
    z-index: 8000;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;
