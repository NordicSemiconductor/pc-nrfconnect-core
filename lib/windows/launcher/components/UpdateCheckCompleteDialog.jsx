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

import ConfirmationDialog from '../../../components/ConfirmationDialog';

/**
 * Dialog that shows the result after checking for updates. This is
 * shown after the user has clicked "Check for updates", and lets the user
 * know if one or more *apps* have updates.
 *
 * @param {boolean} isVisible Show the dialog or not.
 * @param {boolean} isAppUpdateAvailable True if one or more apps have updates.
 * @param {function} onOk Invoked when user clicks OK.
 * @returns {*} React element to be rendered.
 */
const UpdateCheckSuccessDialog = ({
    isVisible,
    isAppUpdateAvailable,
    onOk,
}) => (
    <ConfirmationDialog
        isVisible={isVisible}
        title="Update check completed"
        text={
            isAppUpdateAvailable
                ? 'One or more updates are available. Go to the Add/remove apps screen to upgrade.'
                : 'All apps are up to date.'
        }
        onOk={onOk}
    />
);

UpdateCheckSuccessDialog.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    isAppUpdateAvailable: PropTypes.bool.isRequired,
    onOk: PropTypes.func.isRequired,
};

export default UpdateCheckSuccessDialog;
