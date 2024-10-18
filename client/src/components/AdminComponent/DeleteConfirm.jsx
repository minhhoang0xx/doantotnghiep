import React from 'react';
import { Modal, Button } from 'antd';

const DeleteConfirm = ({ open, onConfirm, onCancel, itemName }) => {
    return (
        <Modal
            title="Confirm Deletion"
            open={open}
            onOk={onConfirm}
            onCancel={onCancel}
            okText="Delete"
            cancelText="Cancel"
        >
            <p>Are you sure you want to delete {itemName}?</p>
        </Modal>
    );
};

export default DeleteConfirm;
