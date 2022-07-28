import AskModal from '../common/AskModal';

const AskRemoveModal = ({ visible, onConfirm, onCancel }) => {
    return (
        <AskModal
        visible={visible}
        title="Delete Post"
        description="Your post will be PERMANENTLY deleted. Confirm to proceed."
        confirmText="Confirm Delete"
        onConfirm={onConfirm}
        onCancel={onCancel}
        />
    );
};

export default AskRemoveModal;