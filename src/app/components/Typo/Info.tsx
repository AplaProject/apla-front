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
import classNames from 'classnames';

interface Props {
    className?: string;
    icon?: string;
    title: string;
}

const Info: React.SFC<Props> = props => (
    <div className={props.className}>
        <div className="info__heading">
            {props.icon && (
                <em className={classNames('info__icon', props.icon)} />
            )}
            <span className="info__title">{props.title}</span>
        </div>
        <div className="info__content">{props.children}</div>
    </div>
);

export default themed(Info)`
    margin-bottom: 30px;

    .info__heading {
        margin-bottom: 10px;
        line-height: 16px;
    }

    .info__title {
        font-size: 16px;
        color: #4c4c4c;
        font-weight: 500;
        vertical-align: top;
    }

    .info__icon {
        float: left;
        font-size: 15px;
        margin-right: 10px;
        vertical-align: middle;
    }

    .info__content {
        color: #848484;
        font-size: 16px;
        word-break: break-all;
    }

    & .hint__icon {
        width: 35px;
        text-align: center;

        > .fa {
            color: #4c4c4c;
            font-size: 18px;
            vertical-align: middle;
        }
    }

    & .hint__content {
        color: #838383;
        flex: 1;
    }
`;
