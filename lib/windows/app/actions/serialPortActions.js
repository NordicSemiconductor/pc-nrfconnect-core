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

import SerialPort from 'serialport';
import { isPortAvailable, decorateWithSerialNumber } from '../../../api/jlink';
import { logger } from '../../../api/logging';

export const SERIAL_PORTS_LOAD = 'SERIAL_PORTS_LOAD';
export const SERIAL_PORTS_LOAD_SUCCESS = 'SERIAL_PORTS_LOAD_SUCCESS';
export const SERIAL_PORTS_LOAD_ERROR = 'SERIAL_PORTS_LOAD_ERROR';
export const SERIAL_PORT_SELECTOR_TOGGLE_EXPANDED = 'SERIAL_PORT_SELECTOR_TOGGLE_EXPANDED';
export const SERIAL_PORT_SELECTED = 'SERIAL_PORT_SELECTED';
export const SERIAL_PORT_DESELECTED = 'SERIAL_PORT_DESELECTED';

function loadPortsAction() {
    return {
        type: SERIAL_PORTS_LOAD,
    };
}

function loadPortsSuccessAction(ports) {
    return {
        type: SERIAL_PORTS_LOAD_SUCCESS,
        ports,
    };
}

function loadPortsErrorAction(message) {
    return {
        type: SERIAL_PORTS_LOAD_ERROR,
        message,
    };
}

function selectorToggleExpandedAction() {
    return {
        type: SERIAL_PORT_SELECTOR_TOGGLE_EXPANDED,
    };
}

function selectPortAction(port) {
    return {
        type: SERIAL_PORT_SELECTED,
        port,
    };
}

export function loadPorts() {
    return dispatch => {
        dispatch(loadPortsAction());
        SerialPort.list((err, ports) => {
            if (err) {
                dispatch(loadPortsErrorAction(err.message));
            } else {
                decorateWithSerialNumber(ports)
                    .then(finalPorts => dispatch(loadPortsSuccessAction(finalPorts)))
                    .catch(error => loadPortsErrorAction(error.message));
            }
        });
    };
}

export function toggleSelectorExpanded() {
    return (dispatch, getState) => {
        const state = getState();
        if (!state.core.serialPort.isSelectorExpanded) {
            dispatch(loadPorts());
        }
        dispatch(selectorToggleExpandedAction());
    };
}

export function selectPort(port) {
    return dispatch => {
        isPortAvailable(port.comName)
            .then(() => dispatch(selectPortAction(port)))
            .catch(error => {
                logger.error('Unable to open the port. Please power cycle the device and try again.');
                logger.debug(error.message);
            });
    };
}

export function deselectPort() {
    return {
        type: SERIAL_PORT_DESELECTED,
    };
}
