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
import { INetworkEndpoint } from 'apla/auth';
import { Route, Switch } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { mainRoute } from 'lib/routing';
import platform from 'lib/platform';
import classnames from 'classnames';
import baseTheme from 'components/Theme/baseTheme';

import themed from 'components/Theme/themed';
import Auth from 'containers/Auth';
import Error from 'containers/Auth/Error';
import Splash from 'components/Splash';
import ModalProvider from 'containers/Modal/ModalProvider';
import NotificationsProvider from 'containers/Notifications/NotificationsProvider';
// import SecurityWarning from 'containers/SecurityWarning';
import ThemeProvider from 'components/Theme/ThemeProvider';
import Titlebar from 'components/Titlebar';
// import Legal from 'components/Legal';
import Main from './Main';
import Preloader from 'containers/Preloader';
// import Layout from './Layout';

interface AppProps {
    network: INetworkEndpoint;
    locale: string;
    isSessionAcquired: boolean;
    isAuthenticated: boolean;
    isLoaded: boolean;
    isFatal: boolean;
    securityWarningClosed: boolean;
    localeMessages: { [key: string]: string };
    initialize?: () => void;
}

const ThemedApp = themed.div`
    &.platform-windows {
        border: solid 1px ${props => props.theme.windowBorder};
    }
`;

const StyledTitlebar = themed.div`
    background: ${props => props.theme.headerBackground};
    height: ${props => props.theme.headerHeight}px;
    line-height: ${props => props.theme.headerHeight}px;
    font-size: 15px;
    color: #fff;
    text-align: center;
`;

class App extends React.Component<AppProps> {
    componentDidMount() {
        this.props.initialize();
    }

    render() {
        const appTitle = `Apla ${
            this.props.network ? '(' + this.props.network.apiHost + ')' : ''
        }`;
        const classes = classnames({
            'platform-desktop': platform.select({ desktop: true }),
            'platform-web': platform.select({ web: true }),
            'platform-windows': platform.select({ win32: true })
        });

        return (
            <IntlProvider
                key={this.props.locale}
                locale={this.props.locale}
                defaultLocale="en-US"
                messages={this.props.localeMessages}
            >
                <ThemeProvider theme={baseTheme}>
                    <ThemedApp className={classes}>
                        <StyledTitlebar className="drag">
                            <Titlebar>{appTitle}</Titlebar>
                        </StyledTitlebar>
                        <ModalProvider />
                        <Preloader />
                        <NotificationsProvider />

                        {/* {platform.select({
                                web: !this.props.securityWarningClosed && (
                                    <SecurityWarning>
                                        <FormattedMessage
                                            id="general.security.warning"
                                            defaultMessage="Please use desktop version or mobile application for better security"
                                        />
                                    </SecurityWarning>
                                )
                            })} */}

                        <Switch>
                            {this.props.isFatal && (
                                <Route path="/" component={Error} />
                            )}
                            {!this.props.isLoaded && (
                                <Route path="/" component={Splash} />
                            )}
                            {!this.props.isAuthenticated && (
                                <Route path="/" component={Auth} />
                            )}
                            {!this.props.isSessionAcquired && (
                                <Route path="/" component={Splash} />
                            )}
                            <Route
                                path={mainRoute}
                                render={route => (
                                    <Main {...route.match.params} />
                                )}
                            />
                        </Switch>
                    </ThemedApp>
                </ThemeProvider>
            </IntlProvider>
        );
    }
}

function updateSizes() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', updateSizes);
updateSizes();

export default App;
