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
import { InjectedIntl } from 'react-intl';
import { IModal, TModalResultReason } from 'apla/modal';
import { INotification } from 'apla/notifications';
import uuid from 'uuid';

import Wrapper from 'components/Modal/Wrapper';
import DebugContractModal from 'components/Modal/Editor/DebugContractModal';
import PromptModal from 'components/Modal/PromptModal';
import ImageEditorModal from 'components/Modal/ImageEditorModal';
import MapEditorModal from 'components/Modal/MapEditorModal';
import AboutModal from 'components/Modal/AboutModal';
import InfoModal from 'components/Modal/InfoModal';
import ErrorModal from 'components/Modal/ErrorModal';
import ConfirmModal from 'components/Modal/ConfirmModal';
import CreatePageModal from 'components/Modal/Editor/CreatePageModal';
import CreateInterfaceModal from 'components/Modal/Editor/CreateInterfaceModal';
import AuthorizeModal from 'components/Modal/Tx/AuthorizeModal';
import SignatureModal from 'components/Modal/Tx/SignatureModal';
import TxErrorModal from 'components/Modal/Tx/ErrorModal';
import AuthErrorModal from 'components/Modal/Auth/AuthErrorModal';
import AuthRemoveWalletModal from 'components/Modal/Auth/AuthRemoveWalletModal';
import AuthChangePasswordModal from 'components/Modal/Auth/AuthChangePasswordModal';
import AuthPasswordChangedModal from 'components/Modal/Auth/AuthPasswordChangedModal';
import AuthSecurityNoticeModal from 'containers/Modal/SecurityNoticeModal';
import AuthAccountCreated from 'containers/Modal/AuthAccountCreated';
import TxConfirmModal from './Tx/ConfirmModal';
import PageModal from './PageModal';
import CopyWalletModal from './Auth/CopyWalletModal';
import RolePickerModal from 'containers/Modal/RolePickerModal';
import RemoveNetworkModal from './Network/RemoveNetworkModal';
import NetworkErrorModal from './Auth/NetworkErrorModal';
import EditorCloseModal from 'containers/Modal/EditorCloseModal';
import EditorRevertModal from 'containers/Modal/EditorRevertModal';
import EditorCloseAllModal from 'containers/Modal/EditorCloseAllModal';
import CreateContractModal from './Editor/CreateContractModal';
import ChangeLocaleModal from 'containers/Modal/ChangeLocaleModal';
import BackupModal from 'containers/Modal/BackupModal';
import AuthSecurityProcessModal from 'containers/Modal/SecurityProcessModal';
import AuthAccountRemove from 'containers/Modal/AccountRemoveModal';
import SignPdfModal from 'containers/Modal/SignPdfModal';

const MODAL_COMPONENTS = {
    AUTHORIZE: AuthorizeModal,
    AUTH_ERROR: AuthErrorModal,
    AUTH_REMOVE_WALLET: AuthRemoveWalletModal,
    AUTH_CHANGE_PASSWORD: AuthChangePasswordModal,
    AUTH_PASSWORD_CHANGED: AuthPasswordChangedModal,
    AUTH_SECURITY_NOTICE: AuthSecurityNoticeModal,
    AUTH_SECURITY_PROCESS: AuthSecurityProcessModal,
    AUTH_ACCOUNT_CREATED: AuthAccountCreated,
    AUTH_ACCOUNT_REMOVE: AuthAccountRemove,
    COPY_WALLET: CopyWalletModal,
    TX_CONFIRM: TxConfirmModal,
    TX_ERROR: TxErrorModal,
    TX_SIGNATURE: SignatureModal,
    CREATE_CONTRACT: CreateContractModal,
    CREATE_PAGE: CreatePageModal,
    CREATE_INTERFACE: CreateInterfaceModal,
    DEBUG_CONTRACT: DebugContractModal,
    IMAGE_EDITOR: ImageEditorModal,
    MAP_EDITOR: MapEditorModal,
    NETWORK_ERROR: NetworkErrorModal,
    PAGE_MODAL: PageModal,
    PROMPT: PromptModal,
    REMOVE_NETWORK: RemoveNetworkModal,
    CONFIRM: ConfirmModal,
    INFO: InfoModal,
    ERROR: ErrorModal,
    ABOUT: AboutModal,
    ROLE_PICKER: RolePickerModal,
    EDITOR_CLOSE_UNSAVED: EditorCloseModal,
    EDITOR_REVERT_UNSAVED: EditorRevertModal,
    EDITOR_CLOSE_ALL: EditorCloseAllModal,
    CHANGE_LOCALE: ChangeLocaleModal,
    BACKUP: BackupModal,
    SIGN_PDF: SignPdfModal
};

export interface IModalProviderProps {
    modal: IModal;
    intl: InjectedIntl;
    onResult: (params: { reason: TModalResultReason; data: any }) => any;
    enqueueNotification: (params: INotification) => any;
}

class ModalProvider extends React.Component<IModalProviderProps> {
    onResult(data: any) {
        this.props.onResult({
            reason: 'RESULT',
            data
        });
    }

    onCancel() {
        this.props.onResult({
            reason: 'CANCEL',
            data: null
        });
    }

    notify(type: string, params: any) {
        this.props.enqueueNotification({
            id: uuid.v4(),
            type,
            params
        });
    }

    render() {
        const Modal =
            (this.props.modal &&
                !this.props.modal.result &&
                MODAL_COMPONENTS[this.props.modal.type]) ||
            null;
        return (
            <Wrapper>
                {Modal && (
                    <Modal
                        key={this.props.modal.id}
                        active
                        intl={this.props.intl}
                        onResult={this.onResult.bind(this)}
                        onCancel={this.onCancel.bind(this)}
                        notify={this.notify.bind(this)}
                        {...this.props.modal}
                    />
                )}
            </Wrapper>
        );
    }
}

export default ModalProvider;
