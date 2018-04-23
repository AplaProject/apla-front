// Copyright 2017 The genesis-front Authors
// This file is part of the genesis-front library.
// 
// The genesis-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The genesis-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the genesis-front library. If not, see <http://www.gnu.org/licenses/>.

import GenesisAPI, { IRequestTransport, TRequestMethod } from './';
import { IContentRequest } from 'genesis/api';

interface IMockTransportResponse {
    __requestUrl: string;
    method: TRequestMethod;
    url: string;
    body: { [key: string]: any };
    query: { [key: string]: any };
    headers: { [key: string]: any };
}

const apiPassthroughTransportMock: IRequestTransport = request => {
    return new Promise<any>((resolve, reject) => {
        setTimeout(() => {
            resolve({
                body: request
            });
        }, 0);
    });
};

const paramsTransportMock: IRequestTransport = request => {
    return new Promise<any>((resolve, reject) => {
        setTimeout(() => {
            resolve({
                body: {
                    __requestUrl: request.url,
                    body: request.body
                }
            });
        }, 0);
    });
};

const mockFormData = (values: { [key: string]: any }) => {
    const value = new FormData();
    for (let itr in values) {
        if (values.hasOwnProperty(itr)) {
            value.append(itr, values[itr]);
        }
    }
    return value;
};

const paramTestingAPIHost = 'http://test_Url.com';
const paramTestingAPIEndpoint = 'api/v2';
const paramTestingAPIMock = () => new GenesisAPI({
    apiHost: paramTestingAPIHost,
    apiEndpoint: paramTestingAPIEndpoint,
    transport: paramsTransportMock
});

test('Url slug parsing', () => {
    const TEST_URL = '://test_url.com';
    const TEST_ENDPOINT = 'api/v2';
    const TEST_ROUTE = 'test_route';

    class MockAPI extends GenesisAPI {
        public slugEndpoint = this.setEndpoint<{ slug: string }, IMockTransportResponse>('get', `${TEST_ROUTE}/{slug}`);
        public complexSlugEndpoint = this.setEndpoint<{ a: string, b: string }, IMockTransportResponse>('get', `${TEST_ROUTE}/{a}/${TEST_ROUTE}/{b}/test`);
        public postSlugEndpoint = this.setEndpoint<{ slug: string, some: 1, more: true, params: 'hello' }, IMockTransportResponse>('post', `${TEST_ROUTE}/{slug}`);
    }

    const api = new MockAPI({
        apiHost: TEST_URL,
        apiEndpoint: TEST_ENDPOINT,
        transport: apiPassthroughTransportMock
    });

    return Promise.all([
        api.slugEndpoint({ slug: 'test0123456789' }).then(l =>
            expect(l.url).toEqual(`${TEST_URL}/${TEST_ENDPOINT}/${TEST_ROUTE}/test0123456789?slug=test0123456789`)
        ),
        api.complexSlugEndpoint({ a: '../../test', b: '-12345-' }).then(l =>
            expect(l.url).toEqual(`${TEST_URL}/${TEST_ENDPOINT}/${TEST_ROUTE}/${encodeURIComponent('../../test')}/${TEST_ROUTE}/-12345-/test?a=..%2F..%2Ftest&b=-12345-`)
        ),
        api.postSlugEndpoint({ slug: 'test0123456789', some: 1, more: true, params: 'hello' }).then(l =>
            expect(l.url).toEqual(`${TEST_URL}/${TEST_ENDPOINT}/${TEST_ROUTE}/test0123456789`)
        )
    ]);
});

test('Request transformer', () => {
    const testData = {
        first: 1,
        second: 2,
        third: 3
    };

    class MockAPI extends GenesisAPI {
        public transformEndpoint = this.setEndpoint<typeof testData, IMockTransportResponse>('get', 'test', {
            requestTransformer: request => ({
                first: request.third,
                third: request.first
            })
        });
    }

    const api = new MockAPI({
        apiHost: '://test_url.com',
        apiEndpoint: 'api/v2',
        transport: apiPassthroughTransportMock
    });

    return api.transformEndpoint(testData).then(l => {
        expect(l.url).toEqual('://test_url.com/api/v2/test?first=3&third=1');
    });
});

test('Response transformer', () => {
    const testData = {
        first: 1,
        second: 2,
        third: 3
    };

    class MockAPI extends GenesisAPI {
        public transformEndpoint = this.setEndpoint<typeof testData, Partial<typeof testData>>('post', 'test', {
            responseTransformer: response => ({
                first: response.body.get('third'),
                third: response.body.get('first')
            })
        });
    }

    const api = new MockAPI({
        apiHost: '://test_url.com',
        apiEndpoint: 'api/v2',
        transport: apiPassthroughTransportMock
    });

    return api.transformEndpoint(testData).then(l =>
        expect(l).toEqual({
            first: '3',
            third: '1'
        })
    );
});

test('Login', () => {
    const testRequest = {
        ecosystem: '1',
        expire: 4815162342,
        publicKey: '04123456789',
        signature: 'test',
        role: 123
    };

    return paramTestingAPIMock().login(testRequest).then((response: any) => {
        expect(response).toEqual({
            __requestUrl: `${paramTestingAPIHost}/${paramTestingAPIEndpoint}/login`,
            body: mockFormData({
                ecosystem: '1',
                expire: 4815162342,
                pubkey: '123456789',
                signature: 'test',
                role_id: 123,
            }),
            roles: []
        });
    });
});

test('Refresh', () => {
    const testRequest = {
        token: '4815162342',
        expire: 4815162342
    };

    return paramTestingAPIMock().refresh(testRequest).then((response: any) => {
        expect(response).toEqual({
            __requestUrl: `${paramTestingAPIHost}/${paramTestingAPIEndpoint}/refresh`,
            body: mockFormData({
                token: '4815162342',
                expire: 4815162342
            })
        });
    });
});

test('RequestNotifications', () => {
    const testRequest = [
        { id: '1', ecosystem: '2' },
        { id: '1', ecosystem: '1' },
        { id: '1', ecosystem: '3' },
        { id: '2', ecosystem: '1' },
        { id: '2', ecosystem: '2' },
        { id: '3', ecosystem: '3' },
        { id: '3', ecosystem: '1' },
        { id: '3', ecosystem: '2' },
        { id: '3', ecosystem: '3' },
    ];

    return paramTestingAPIMock().requestNotifications(testRequest).then((response: any) => {
        expect(response).toEqual({
            __requestUrl: `${paramTestingAPIHost}/${paramTestingAPIEndpoint}/updnotificator`,
            body: mockFormData({
                ids: JSON.stringify(testRequest)
            })
        });
    });
});

test('GetConfig', () => {
    const testRequest = 'centrifugo';

    return paramTestingAPIMock().getConfig({ name: 'centrifugo' }).then((response: any) => {
        expect(response).toEqual({
            __requestUrl: `${paramTestingAPIHost}/${paramTestingAPIEndpoint}/config/${testRequest}`,
            body: null
        });
    });
});

test('GetContract', () => {
    const testRequest = {
        name: 'TEST_CONTRACT',
    };

    return paramTestingAPIMock().getContract(testRequest).then((response: any) => {
        expect(response).toEqual({
            __requestUrl: `${paramTestingAPIHost}/${paramTestingAPIEndpoint}/contract/TEST_CONTRACT`,
            body: null
        });
    });
});

test('GetContracts', () => {
    const testRequest = {
        offset: 4,
        limit: 8
    };

    return paramTestingAPIMock().getContracts(testRequest).then((response: any) => {
        expect(response).toEqual({
            __requestUrl: `${paramTestingAPIHost}/${paramTestingAPIEndpoint}/contracts?limit=8&offset=4`,
            body: null
        });
    });
});

test('GetParam', () => {
    const testRequest = {
        name: 'TEST_PARAM'
    };

    return paramTestingAPIMock().getParam(testRequest).then((response: any) => {
        expect(response).toEqual({
            __requestUrl: `${paramTestingAPIHost}/${paramTestingAPIEndpoint}/ecosystemparam/TEST_PARAM`,
            body: null
        });
    });
});

test('GetParams', () => {
    const testRequest = {
        names: ['TEST_PARAM', 'MOCK_PARAM', ',#PARAM']
    };

    return paramTestingAPIMock().getParams(testRequest).then((response: any) => {
        expect(response).toEqual({
            __requestUrl: `${paramTestingAPIHost}/${paramTestingAPIEndpoint}/ecosystemparams?names=TEST_PARAM%2CMOCK_PARAM%2C%2C%23PARAM`,
            body: null
        });
    });
});

test('GetPage', () => {
    const testRequest = {
        name: 'TEST_PAGE'
    };

    return paramTestingAPIMock().getPage(testRequest).then((response: any) => {
        expect(response).toEqual({
            __requestUrl: `${paramTestingAPIHost}/${paramTestingAPIEndpoint}/interface/page/TEST_PAGE`,
            body: null
        });
    });
});

test('GetMenu', () => {
    const testRequest = {
        name: 'TEST_MENU'
    };

    return paramTestingAPIMock().getMenu(testRequest).then((response: any) => {
        expect(response).toEqual({
            __requestUrl: `${paramTestingAPIHost}/${paramTestingAPIEndpoint}/interface/menu/TEST_MENU`,
            body: null
        });
    });
});

test('GetBlock', () => {
    const testRequest = {
        name: 'TEST_BLOCK'
    };

    return paramTestingAPIMock().getBlock(testRequest).then((response: any) => {
        expect(response).toEqual({
            __requestUrl: `${paramTestingAPIHost}/${paramTestingAPIEndpoint}/interface/block/TEST_BLOCK`,
            body: null
        });
    });
});

test('GetTable', () => {
    const testRequest = {
        name: 'TEST_TABLE'
    };

    return paramTestingAPIMock().getTable(testRequest).then((response: any) => {
        expect(response).toEqual({
            __requestUrl: `${paramTestingAPIHost}/${paramTestingAPIEndpoint}/table/TEST_TABLE`,
            body: null
        });
    });
});

test('GetTables', () => {
    const testRequest = {
        offset: 4,
        limit: 8
    };

    return paramTestingAPIMock().getTables(testRequest).then((response: any) => {
        expect(response).toEqual({
            __requestUrl: `${paramTestingAPIHost}/${paramTestingAPIEndpoint}/tables?limit=8&offset=4`,
            body: null
        });
    });
});

test('GetHistory', () => {
    const testRequest = {
        id: '4815162342',
        table: 'TEST_TABLE'
    };

    return paramTestingAPIMock().getHistory(testRequest).then((response: any) => {
        expect(response).toEqual({
            __requestUrl: `${paramTestingAPIHost}/${paramTestingAPIEndpoint}/history/TEST_TABLE/4815162342`,
            body: null
        });
    });
});

test('GetRow', () => {
    const testRequest = {
        id: '4815162342',
        table: 'TEST_TABLE',
        columns: ['COL_1', 'COL2', '@COL"3']
    };

    return paramTestingAPIMock().getRow(testRequest).then((response: any) => {
        expect(response).toEqual({
            __requestUrl: `${paramTestingAPIHost}/${paramTestingAPIEndpoint}/row/TEST_TABLE/4815162342?columns=COL_1%2CCOL2%2C%40COL%223`,
            body: null
        });
    });
});

test('GetData', () => {
    const testRequest = {
        name: 'TEST_TABLE',
        columns: ['COL_1', 'COL2', '@COL"3']
    };

    return paramTestingAPIMock().getData(testRequest).then((response: any) => {
        expect(response).toEqual({
            __requestUrl: `${paramTestingAPIHost}/${paramTestingAPIEndpoint}/list/TEST_TABLE?columns=COL_1%2CCOL2%2C%40COL%223`,
            body: null
        });
    });
});

test('Content', () => {
    const testRequest = {
        type: 'page',
        name: 'TEST_PAGE',
        locale: 'en-US',
        params: {
            strParam: 'hello?',
            numParam: 4815162342,
            boolParam: true
        }
    } as IContentRequest;

    return paramTestingAPIMock().content(testRequest).then((response: any) => {
        expect(response).toEqual({
            __requestUrl: `${paramTestingAPIHost}/${paramTestingAPIEndpoint}/content/page/TEST_PAGE`,
            body: mockFormData({
                lang: 'en-US',
                strParam: 'hello?',
                numParam: 4815162342,
                boolParam: true
            })
        });
    });
});

test('ContentTest', () => {
    const testRequest = {
        template: 'TEST_DATA',
        locale: 'en-US',
        params: {
            strParam: 'hello?',
            numParam: 4815162342,
            boolParam: true
        }
    };

    return paramTestingAPIMock().contentTest(testRequest).then((response: any) => {
        expect(response).toEqual({
            __requestUrl: `${paramTestingAPIHost}/${paramTestingAPIEndpoint}/content`,
            body: mockFormData({
                lang: 'en-US',
                template: 'TEST_DATA',
                strParam: 'hello?',
                numParam: 4815162342,
                boolParam: true
            })
        });
    });
});

test('TxCall', () => {
    const testRequest = {
        pubkey: '4815162342',
        signature: 'TEST_SIGN',
        time: '4815162342',
        requestID: 'RID-4815162342'
    };

    return paramTestingAPIMock().txCall(testRequest).then((response: any) => {
        expect(response).toEqual({
            __requestUrl: `${paramTestingAPIHost}/${paramTestingAPIEndpoint}/contract/RID-4815162342`,
            body: mockFormData({
                pubkey: '4815162342',
                signature: 'TEST_SIGN',
                time: '4815162342'
            })
        });
    });
});

test('TxPrepare', () => {
    const testRequest = {
        name: 'TEST_TX',
        params: {
            strParam: 'hello?',
            numParam: 4815162342,
            boolParam: true
        }
    };

    return paramTestingAPIMock().txPrepare(testRequest).then((response: any) => {
        expect(response).toEqual({
            __requestUrl: `${paramTestingAPIHost}/${paramTestingAPIEndpoint}/prepare/TEST_TX`,
            body: mockFormData({
                strParam: 'hello?',
                numParam: 4815162342,
                boolParam: true
            })
        });
    });
});

test('TxStatus', () => {
    const testRequest = {
        hash: '4815162342'
    };

    return paramTestingAPIMock().txStatus(testRequest).then((response: any) => {
        expect(response).toEqual({
            __requestUrl: `${paramTestingAPIHost}/${paramTestingAPIEndpoint}/txstatus/4815162342`,
            body: null
        });
    });
});