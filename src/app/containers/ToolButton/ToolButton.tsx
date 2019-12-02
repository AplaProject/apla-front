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
import uuid from 'uuid';
import propTypes from 'prop-types';
import { IRootState } from 'modules';
import { connect } from 'react-redux';
import { buttonInteraction } from 'modules/content/actions';

import ToolButton from 'components/Protypo/components/ToolButton';

export interface IToolButtonProps {
    title?: string;
    icon?: string;
    // Redirect if all previous actions succeeded
    page?: string;
    pageparams?: {
        [name: string]: string;
    };

    // Page must be rendered within a modal dialog
    popup?: {
        header?: string;
        width?: string;
    };
}

interface IToolButtonState {
}

interface IToolButtonDispatch {
    buttonInteraction: typeof buttonInteraction.started;
}

class ToolButtonContainer extends React.Component<IToolButtonProps & IToolButtonState & IToolButtonDispatch> {
    private _uuid: string = null;

    static contextTypes = {
        protypo: propTypes.object.isRequired,
        section: propTypes.string.isRequired
    };

    onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        this._uuid = uuid.v4();

        const pageParams = this.props.pageparams;

        if (null === pageParams) {
            return;
        }

        let popup: { title?: string, width?: number } = null;
        if (this.props.popup) {
            const width = parseInt(this.props.popup.width, 10);
            popup = {
                title: this.props.popup.header,
                width: width === width ? width : null
            };
        }

        this.props.buttonInteraction({
            uuid: this._uuid,
            popup,
            actions: [],
            contracts: [],
            from: this.context.protypo.getFromContext(this.props.title),
            page: this.props.page ? {
                name: this.props.page,
                section: this.context.section,
                params: pageParams
            } : null
        });
    }

    render() {
        return (
            <ToolButton {...this.props} onClick={this.onClick} />
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
});

const mapDispatchToProps = {
    buttonInteraction: buttonInteraction.started
};

export default connect<IToolButtonState, IToolButtonDispatch, IToolButtonProps>(mapStateToProps, mapDispatchToProps)(ToolButtonContainer);