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
import Protypo from 'containers/Widgets/Protypo';
import { IPage } from 'apla/content';
import { STATIC_PAGES } from 'lib/staticPages';

import themed from 'components/Theme/themed';
import Error from './Error';
import Timeout from './Timeout';
import NotFound from './NotFound';
import DocumentTitle from 'components/DocumentTitle';

export interface IPageProps {
    section: string;
    value: IPage;
}

const StyledPage = themed.article`
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
    overflow-x: hidden;
    overflow-y: auto;
`;

const Page: React.SFC<IPageProps> = props => {
    if (props.value.error) {
        switch (props.value.error) {
            case 'E_HEAVYPAGE': return (<Timeout />);
            case 'E_NOTFOUND': return (<NotFound />);
            default: return (<Error error={props.value.error} />);
        }
    }
    else {
        const staticPage = STATIC_PAGES[props.value.name];
        const title = props.value.location && props.value.location.state && props.value.location.state.from && props.value.location.state.from.title;

        return (
            <DocumentTitle title={title}>
                <StyledPage>
                    {props.value.static && (
                        staticPage.render(props.section, {
                            ...props.value.params,
                            children: props.value && props.value.content
                        })
                    )}
                    {!props.value.static && (
                        <Protypo
                            context="page"
                            section={props.section}
                            page={props.value.name}
                            content={props.value.content}
                        />
                    )}
                </StyledPage>
            </DocumentTitle>
        );
    }
};

export default Page;