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
import Button from 'components/Form/Button';

import Modal from './';
import ModalWindow from 'containers/Modal/ModalWindow';

interface Params {
    onImport: () => any;
    onExport: () => any;
    onClear: () => any;
}

class DeveloperModal extends Modal<Params, void> {
    public static className = ' ';

    render() {
        return (
            <ModalWindow
                title="Developer menu"
                controls={
                    <>
                        <Button
                            block
                            color="link"
                            onClick={this.props.onCancel}
                        >
                            Close
                        </Button>
                    </>
                }
            >
                <Button
                    block
                    onClick={this.props.params.onImport}
                    className="mb"
                >
                    Import account
                </Button>
                <Button
                    block
                    onClick={this.props.params.onExport}
                    className="mb"
                >
                    Export account
                </Button>
                <Button
                    block
                    onClick={this.props.params.onClear}
                    className="mb"
                >
                    Clear account data
                </Button>
            </ModalWindow>
        );
    }
}
export default DeveloperModal;
