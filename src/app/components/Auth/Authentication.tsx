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
import Panel from 'components/Panel';
import PanelHeading from 'components/Panel/PanelHeading';
import AccountForm from './AccountForm';
import ExternalAuth from 'containers/Auth/ExternalAuth';

interface Props {
    title: string;
    onReturn: () => void;
    onProcess: (params: {
        password: string;
        email: string;
        name: string;
    }) => void;
    onProcessExternal: (password: string) => void;
}

interface State {
    step: AuthStep;
}

type AuthStep = 'form' | 'external';

class Authentication extends React.Component<Props, State> {
    state: State = {
        step: 'form'
    };

    handleProcessExternal = (password: string) => {
        this.props.onProcessExternal(password);
        this.setState({
            step: 'external'
        });
    };

    handleBack = () => {
        if ('form' === this.state.step) {
            this.props.onReturn();
        } else {
            this.setState({
                step: 'form'
            });
        }
    };

    render() {
        return (
            <Panel>
                <PanelHeading
                    leftButton={{
                        icon: 'ArrowLeft',
                        onClick: this.handleBack
                    }}
                >
                    {this.props.title}
                </PanelHeading>
                {'form' === this.state.step ? (
                    <AccountForm
                        onProcess={this.props.onProcess}
                        onProcessExternal={this.handleProcessExternal}
                    />
                ) : (
                    <ExternalAuth />
                )}
            </Panel>
        );
    }
}

export default Authentication;
