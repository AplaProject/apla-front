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

import * as React from 'react';
import StyledComponent from 'components/Protypo/handlers/StyledComponent';
import DnDComponent from './DnDComponent';
import { If } from './If';

class ElseIf extends If {
    protected logic = true;
    protected canMove = false;
    protected editableDisplay = 'block';
    protected editable = false;

    renderChildren(classes: string) {
        return (
            <div
                className={classes}
            >
                {this.renderSwitch('ElseIf')}
                <div>
                    {this.state.condition && this.props.children}
                </div>
                <span style={{'backgroundColor': '#FFCC66'}}>&#125;</span>
            </div>
        );
    }
}

export default DnDComponent(StyledComponent(ElseIf));
