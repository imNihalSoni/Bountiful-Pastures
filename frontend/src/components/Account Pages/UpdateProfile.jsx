import React, { Fragment, useState ,useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Form,
  Input,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from 'reactstrap';
import { clearErrors, updateProfile, loadUser,updateReset } from '../../actions/userActions';


export const UpdateProfile = () => {
  const dispatch = useDispatch();
  let navigate=useNavigate();
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(user.avatar.url);
  const [avatarPreview, setAvatarPreview] = useState();

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    if (avatar) {
        myForm.set("avatar", avatar);
      }
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      dispatch(clearErrors());
    }

    if (isUpdated) {
      dispatch(loadUser());

      navigate("/me");
      dispatch(updateReset());
    }
  }, [dispatch, error, user, isUpdated]);
  return (
    <Fragment>
      <div className="section landing-section">
        <Container>
          <Row className="d-flex justify-content-center">
            <Col className="ml-auto mr-auto" md="8">
              <h2 className="text-center">Update Profile</h2>
              <Form className="contact-form" onSubmit={updateProfileSubmit}>
                <Row>
                  <Col md="6">
                    <label>Name</label>
                    <InputGroup>
                      <InputGroupText>
                        <i className="nc-icon nc-single-02" />
                      </InputGroupText>
                      <Input
                        placeholder="Name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </InputGroup>
                  </Col>
                  <Col md="6">
                    <label>Email</label>
                    <InputGroup>
                      <InputGroupText>
                        <i className="nc-icon nc-email-85" />
                      </InputGroupText>
                      <Input
                        placeholder="Email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row style={{marginTop:"5%"}}>
                  <Col md="12">
                    <div id="updateProfileImage" className="avatar">
                      <img src={avatarPreview} alt="Avatar Preview" className='img-responsive' style={{ width: "100px", height: "100px" }}/>
                      <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        style={{marginLeft:"5%"}}
                        onChange={updateProfileDataChange}
                      />
                    </div>
                  </Col>
                </Row>
                <Button type="submit" color="danger" block>
                  Update Profile
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};

export default UpdateProfile;
