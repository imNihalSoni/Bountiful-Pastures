import React,{Fragment} from "react";
import { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button, Row, Col } from "reactstrap";
import { clearErrors } from "../../actions/userActions";

const ErrorModal = ({ errorMessage }) => {
  let dispatch=useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      setIsOpen(true);
      dispatch(clearErrors());
    }
  }, [errorMessage]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    
  };
  return (<Fragment>
    <Modal isOpen={isOpen} toggle={toggleModal}>
      <div className="modal-header">
        <Row>
          <Col>
            <h3 className="modal-title text-center d-flex justify-content-center" id="exampleModalLabel">
              Alert
            </h3>
          </Col>
        </Row>
      </div>
      <div className="modal-body d-flex justify-content-center">
        <h4>{errorMessage}</h4>
      </div>
      <div className="modal-footer d-flex justify-content-center">
        <div className="left-side ">
          <Button
            className="btn-link "
            color="default"
            type="button"
            style={{ backgroundColor: "transparent", border: "none" }}
            onClick={toggleModal}
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
    </Fragment>
  );
};

export default ErrorModal;
