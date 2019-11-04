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

import themed from 'components/Theme/themed';

export default themed.button`
    background: #d8d1c7;
    border: 0;
    text-transform: uppercase;
    color: #7a623e;
    border-radius: 31px;
    padding: 10px;
    min-width: 260px;
    font-size: 16px;
    text-align: center;
    text-decoration: none;
    display: inline-block;

    &:hover {
        background: #dcd6cd;
        text-decoration: none;
        color: #7a623e;
    }

    &:disabled {
        background: #ece9e4;
        color: #c5bcad;
    }

    &.block {
        box-sizing: border-box;
        width: 100%;        
    }
`;
