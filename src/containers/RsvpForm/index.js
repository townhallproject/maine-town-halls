import {
  Form,
  Input,
  Checkbox,
  Button,
} from 'antd';
import React from 'react';
import PropTypes from 'prop-types';

const {
  TextArea,
} = Input;


class RsvpForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConfirmBlur = this.handleConfirmBlur.bind(this);


    this.state = {
      confirmDirty: false,
    };
  }

  handleSubmit(e) {
    const {
      submitRsvp,
    } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        submitRsvp(values);
      }
    });
  }

  handleConfirmBlur(e) {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  render() {
    const {
      loading,
    } = this.props;
    const {
      getFieldDecorator,
    } = this.props.form;

    const formItemLayout = {
      labelCol: {
        sm: { span: 8 },
        xs: { span: 24 },
      },
      wrapperCol: {
        sm: { span: 16 },
        xs: { span: 24 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        sm: {
          offset: 8,
          span: 16,
        },
        xs: {
          offset: 0,
          span: 24,
        },
      },
    };

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="First name">
          {getFieldDecorator('given_name', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Last name">
          {getFieldDecorator('family_name', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="E-mail">
          {getFieldDecorator('email_address', {
            rules: [
              {
                message: 'The input is not valid E-mail',
                type: 'email',
              },
              {
                message: 'Please input your E-mail',
                required: true,
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Zip code">
          {getFieldDecorator('postal_code', {
            initialValue: '',
            rules: [
              {
                message: 'Please add your zip code',
                required: true,
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Phone Number">
          {getFieldDecorator('phone', {
            rules: [{
                message: 'Please input your phone number',
                required: false,
            }],
          })(<Input style={{ width: '100%' }} />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('can_contact', {
            initialValue: false,
            valuePropName: 'checked',
          })(<Checkbox>Okay to receive texts from the organizers of this event.</Checkbox>)}
        </Form.Item>
        <Form.Item
          {...tailFormItemLayout}
          label="Accessibly needs"
        >
          {getFieldDecorator('accessibly_needs', {
              initialValue: '',
          })(<TextArea rows={4} />)}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button loading={loading} type="primary" htmlType="submit">
            RSVP
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

RsvpForm.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
    validateFieldsAndScroll: PropTypes.func.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  submitRsvp: PropTypes.func.isRequired,
};

const WrappedRsvpForm = Form.create({ name: 'rsvp' })(RsvpForm);

export default WrappedRsvpForm;
