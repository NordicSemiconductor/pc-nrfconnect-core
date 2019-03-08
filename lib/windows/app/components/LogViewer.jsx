/* Copyright (c) 2015 - 2017, Nordic Semiconductor ASA
 *
 * All rights reserved.
 *
 * Use in source and binary forms, redistribution in binary form only, with
 * or without modification, are permitted provided that the following conditions
 * are met:
 *
 * 1. Redistributions in binary form, except as embedded into a Nordic
 *    Semiconductor ASA integrated circuit in a product or a software update for
 *    such product, must reproduce the above copyright notice, this list of
 *    conditions and the following disclaimer in the documentation and/or other
 *    materials provided with the distribution.
 *
 * 2. Neither the name of Nordic Semiconductor ASA nor the names of its
 *    contributors may be used to endorse or promote products derived from this
 *    software without specific prior written permission.
 *
 * 3. This software, with or without modification, must only be used with a Nordic
 *    Semiconductor ASA integrated circuit.
 *
 * 4. Any software provided in binary form under this license must not be reverse
 *    engineered, decompiled, modified and/or disassembled.
 *
 * THIS SOFTWARE IS PROVIDED BY NORDIC SEMICONDUCTOR ASA "AS IS" AND ANY EXPRESS OR
 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY, NONINFRINGEMENT, AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL NORDIC SEMICONDUCTOR ASA OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
 * TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Infinite from 'react-infinite';
import { Iterable } from 'immutable';
import LogHeaderContainer from '../containers/LogHeaderContainer';
import LogEntry from './LogEntry';
import { decorate } from '../../../util/apps';

const DecoratedLogEntry = decorate(LogEntry, 'LogEntry');

class LogViewer extends React.Component {
    componentDidMount() {
        const { onMount } = this.props;
        if (onMount) {
            onMount();
        }
    }

    componentWillUnmount() {
        const { onUnmount } = this.props;
        if (onUnmount) {
            onUnmount();
        }
    }

    render() {
        const {
            autoScroll,
            logEntries,
            containerHeight,
            elementHeight,
            cssClass,
            infiniteLogCssClass,
        } = this.props;

        const infiniteLoadBeginEdgeOffset = Math.max(
            containerHeight - elementHeight, elementHeight,
        );

        return (
            <div className={cssClass}>
                <LogHeaderContainer />
                <Infinite
                    elementHeight={elementHeight}
                    containerHeight={containerHeight}
                    infiniteLoadBeginEdgeOffset={infiniteLoadBeginEdgeOffset}
                    className={infiniteLogCssClass}
                    autoScroll={autoScroll}
                >
                    {logEntries.map(entry => <DecoratedLogEntry {...{ entry }} key={entry.id} />)}
                </Infinite>
            </div>
        );
    }
}

LogViewer.propTypes = {
    onMount: PropTypes.func,
    onUnmount: PropTypes.func,
    logEntries: PropTypes.oneOfType([
        PropTypes.instanceOf(Array),
        PropTypes.instanceOf(Iterable),
    ]).isRequired,
    autoScroll: PropTypes.bool.isRequired,
    containerHeight: PropTypes.number,
    elementHeight: PropTypes.number,
    cssClass: PropTypes.string,
    infiniteLogCssClass: PropTypes.string,
};

LogViewer.defaultProps = {
    onMount: null,
    onUnmount: null,
    containerHeight: 155,
    elementHeight: 20,
    cssClass: 'core-log-viewer',
    infiniteLogCssClass: 'core-infinite-log',
};

export default LogViewer;
