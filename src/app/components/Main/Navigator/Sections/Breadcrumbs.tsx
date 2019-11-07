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
import classNames from 'classnames';
import { IBreadcrumb } from 'apla/content';

import themed from 'components/Theme/themed';
import Breadcrumb from './Breadcrumb';

interface Props {
    values: IBreadcrumb[];
}

const StyledBreadcrumbs = themed.ul`
    margin: 25px 0;
    padding: 0;
    font-size: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    list-style-type: none;
    
    > li {
        font-size: 16px;
        font-weight: 400;
        color: #4d4d4d;
        margin-right: 10px;
        vertical-align: top;

        &:first-child:before {
            content: none;
        }

        &:before {
            content: '▸';
            font-size: 16px;
            color: #7a623e;
            display: inline-block;
            margin-right: 8px;
        }
    }
`;

const Breadcrumbs: React.SFC<Props> = props => (
    <StyledBreadcrumbs>
        {props.values.map((breadcrumb, i) => (
            <li
                key={i}
                className={classNames({
                    breadcrumbs__breadcrumb_home: 0 === i,
                    breadcrumbs__breadcrumb_normal:
                        props.values.length - 1 > i && 0 !== i,
                    breadcrumbs__breadcrumb_current:
                        props.values.length - 1 === i
                })}
            >
                <Breadcrumb
                    active={i !== props.values.length - 1}
                    section={breadcrumb.section}
                    page={breadcrumb.page}
                    params={breadcrumb.params}
                >
                    {i === 0 ? 'Home' : breadcrumb.title}
                </Breadcrumb>
            </li>
        ))}
    </StyledBreadcrumbs>
);

export default Breadcrumbs;
