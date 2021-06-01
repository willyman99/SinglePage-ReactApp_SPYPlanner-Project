import { Toast } from "react-bootstrap"

const Alert = ({ handleAlert, show, text }) => {

    return (
        <Toast autohide delay={3000} show={show} onClose={() => handleAlert('', false)} style={{ zIndex: 9999, position: 'fixed', bottom: 38, right: 17, width: 300 }}>
            <Toast.Header closeButton={false} >
                <strong className="mr-auto">System message:</strong>
            </Toast.Header>
            <Toast.Body>{text}</Toast.Body>
        </Toast>
    )
}


export default Alert