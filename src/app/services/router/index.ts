/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import Route from 'route-parser';
import querystring from 'query-string';
import { history } from 'store';

export interface IRouteMatch {
    parts: {
        [name: string]: string;
    };
    query: {
        [param: string]: string;
    };
}

export const matchRoute = (path: string, match: string): IRouteMatch | undefined => {
    const route = new Route(path).match(match);
    if (!route) {
        return undefined;
    }

    return {
        parts: route,
        query: querystring.parseUrl(match).query
    };
};

export const generateRoute = (path: string, params?: { [name: string]: string }) => {
    const query = params ? querystring.stringify(params) : '';
    return `${path}${query && '?' + query}`;
};

export const navigate = (path: string, params?: { [key: string]: any }) => {
    history.push({
        pathname: path,
        search: params ? querystring.stringify(params) : ''
    });
};