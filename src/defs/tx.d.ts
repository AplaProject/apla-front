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

declare module 'apla/tx' {
    import { Int64BE } from 'int64-buffer';

    type TTxError =
        'error' |
        'info' |
        'warning' |
        'panic' |
        'E_GUEST_VIOLATION' |
        'E_CONTRACT' |
        'E_SERVER';

    interface ITxResult {
        blockid: string;
        result: string;
    }

    interface IErrorRedirect {
        pagename: string;
        pageparams?: {
            [key: string]: any;
        };
    }

    interface ITxError {
        errorRedirects?: IErrorRedirect;
        id?: string;
        type: TTxError;
        error: string;
        params?: any[];
    }

    interface ITxStatus extends ITxResult, ITxError { }

    interface ITransactionParam {
        type: string;
        value: object;
    }

    type TTransactionStatus =
        'pending' | 'done' | 'error';

    interface ITransactionCollection {
        status: TTransactionStatus;
        error?: ITxError;
        stack: ITransaction[];
    }

    interface ITransaction {
        name: string,
        hash: string,
        status: ITxStatus;
        body: ITransactionBody;
    }

    interface ITransactionCall {
        uuid: string;
        silent?: boolean;
        section?: string;
        contracts: {
            name: string;
            params: {
                [key: string]: any;
            }[];
        }[];
        errorRedirects?: {
            [key: string]: IErrorRedirect;
        }
    }

    interface ITransactionBody {
        Header: {
            ID: number;
            Time: number;
            EcosystemID: number;
            KeyID: Int64BE;
            NetworkID: number;
            PublicKey: ArrayBuffer;
        };
        Params: {
            [key: string]: object;
        };
    }
}
