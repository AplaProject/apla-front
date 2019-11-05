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
import media from 'components/Theme/media';
import { X } from 'react-feather';

interface Props {
    className?: string;
    title: React.ReactNode;
    controls?: React.ReactNode;
    width?: number;
    onClose: () => void;
}

const ModalWindow: React.SFC<Props> = props => (
    <div className={props.className}>
        <section
            className="modalWindow__content"
            style={{ maxWidth: props.width }}
        >
            <h3 className="modalWindow__title">
                <div>{props.title}</div>
                <button className="modalWindow__close" onClick={props.onClose}>
                    <X size={15} />
                </button>
            </h3>
            {props.children}
            {props.controls && (
                <div className="modalWindow__controls">{props.controls}</div>
            )}
        </section>
    </div>
);

export default themed(ModalWindow)`
    display: flex;
    flex-direction: row;
    border-radius: 12px;
    overflow: hidden;
    background: #fff;
    text-align: left;
    max-width: 50vw;

    .modalWindow__content {
        grid-template: 'content';
        background: #fff;
        color: #808080;
        font-size: 14px;
        padding: 20px;
        max-width: 100%;
    }

    .modalWindow__title {
        font-size: 20px;
        color: #4c4c4c;
        font-weight: 500;
        margin: 0;
        padding: 5px 20px 15px;
        text-align: center;
        min-width: 200px;
    }

    .modalWindow__close {
        position: absolute;
        top: 15px;
        right: 15px;
        background: 0;
        outline: 0;
        border: 0;
        padding: 0;
        margin: 0;
        cursor: pointer;

        > svg {
            stroke: #999;
        }

        &:hover > svg {
            stroke: #ccc;
        }

        &:active > svg {
            stroke: #666;
        }
    }

    .modalWindow__controls {
        border-top: solid 1px #e6e6e6;
        margin: 20px -20px 0 -20px;
        padding: 15px 20px 0;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }

    @media (${media.lg}) {
        max-width: none;

        .modalWindow__aside {
            display: none;
        }
        
        .modalWindow__content {
            padding: 20px;
        }
    }
`;
