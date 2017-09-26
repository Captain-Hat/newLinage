import { connect } from 'dva';
import styles from './Login.css';
import { Form, Input, Tooltip, Row, Col, Checkbox, Button, Icon, Modal, message } from 'antd';
const FormItem = Form.Item;
const confirm = Modal.confirm;
import axios from "axios";
import qs from 'qs';
import React, { Component } from 'react'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
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
  getCode = () => {
    axios.get('/newlineage/api/getVerificationCode', {
      params: {
        type: 2
      }
    }).then((res) => {

      if (res.status == 200) {
        // 发布成功跳到列表
        message.success("验证码获取成功");
        this.setState({
          verfyCode: res.data
        })
        this.props.form.setFieldsValue({ 'vertifyCode': res.data })
      }
    })
      .catch((err) => {
        message.warning("请求错误");
      });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 6 },
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
          offset: 8,
        },
      },
    };

    return (
      <div className={styles.normal}>
        <div style={{ paddingLeft: '42px' }}>
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <FormItem
              {...formItemLayout}
              label="帐号"
              hasFeedback
            >
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: '请输入帐号' }, { pattern: /^[0-9A-Za-z]{6,12}$/, message: '帐号为6—12位英文数字组合' }],
              })(
                <Input style={{ width: '246px' }} placeholder={'请输入帐号'} />
                )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="密码"
              hasFeedback
            >
              {getFieldDecorator('passWord', {
                rules: [{ required: true, message: '请输入密码', }, { validator: this.checkConfirm }, { pattern: /^[0-9a-zA-Z!@#$^_.*]{6,13}$/, message: '密码长度为6—13位' }],
              })(
                <Input placeholder={'请输入密码'} style={{ width: '246px' }} type="password" />
                )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="验证码"
            >
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator('vertifyCode', {
                    rules: [{ required: true, message: '请点击生成验证码' }],
                    initialValue: this.state.verfyCode
                  })(
                    <Input placeholder={'点击按钮验证'} size="large" />
                    )}
                </Col>
                <Col span={12}>
                  <Button size="large" style={{ width: '121px' }} onClick={this.getCode.bind(this)}>生成验证</Button>
                </Col>
              </Row>
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" style={{ width: '243px' }}>登录</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}

export default Form.create()(Login);
