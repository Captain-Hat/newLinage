import React, { Component } from 'react';
import styles from './RegistForm.less';
import { Form, Input, Tooltip, Row, Col, Checkbox, Button, Icon, Modal } from 'antd';
const FormItem = Form.Item;
const confirm = Modal.confirm;
class RegistForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      agreement: false
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if (!this.state.agreement) {
          this.warning()
          return
        }
        const { onOk } = this.props;
        onOk(values);
      }
    });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不一致!');
    } else {
      callback();
    }
  }
  warning = () => {
    Modal.warning({
      title: '注册须知',
      content: '请阅读协议并同意后再注册，如不同意，请离开。',
    });
  }
  agreement = (e) => {
    this.setState({ agreement: e.target.checked })
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };
    return (
      <div className={styles.normal}>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <FormItem
            {...formItemLayout}
            label="帐号"
            hasFeedback
          >
            {getFieldDecorator('username', {
              rules: [{
                required: true, message: '请输入帐号',
              }],
            })(
              <Input />
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="密码"
            hasFeedback
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: '请输入密码',
              }, {
                validator: this.checkConfirm,
              }],
            })(
              <Input type="password" />
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="密码确认"
            hasFeedback
          >
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: '请确认你输入的密码',
              }, {
                validator: this.checkPassword,
              }],
            })(
              <Input type="password" onBlur={null} />
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="昵称"
            hasFeedback
          >
            {getFieldDecorator('nickname', {
              rules: [{ required: true, message: '请输入昵称', whitespace: true }],
            })(
              <Input />
              )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="验证码"
          >
            <Row gutter={8}>
              <Col span={12}>
                {getFieldDecorator('captcha', {
                  rules: [{ required: true, message: '请点击生成验证码' }],
                })(
                  <Input size="large" />
                  )}
              </Col>
              <Col span={12}>
                <Button size="large">生成验证</Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
            })(
              <Checkbox onChange={this.agreement.bind(this)}>我已经看完了 <a onClick={this.showModal.bind(this)} href="javascript:;">用户协议</a></Checkbox>
              )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">确认注册</Button>
          </FormItem>
        </Form>
        <Modal
          title="用户协议"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          maskClosable={false}
        >
          <p>1.必须冲钱。</p>
          <p>2.账号被盗概不负责。</p>
          <p>3.私聊GM购买牛逼装备。</p>
        </Modal>
      </div>
    );
  }

}

export default Form.create()(RegistForm);
