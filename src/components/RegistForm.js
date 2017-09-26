import React, { Component } from 'react';
import styles from './RegistForm.less';
import { Form, Input, Tooltip, Row, Col, Checkbox, Button, Icon, Modal, message } from 'antd';
const FormItem = Form.Item;
const confirm = Modal.confirm;
import axios from "axios";
import qs from 'qs';
class RegistForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      agreement: false,
      verfyCode: ''
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
    if (value && value !== form.getFieldValue('passWord')) {
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
        sm: { span: 12 },
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

      <div>
        <div className={styles.text}>
          <div style={{ textAlign: 'center' }}>用户协议</div>
          <p>一、总则</p>
          <p>1.1因为我们喜欢这款游戏并且热爱Java技术，这个测试服仅为了研究天堂1模拟器的运行原理，游戏版权和运营权归NC和腾讯，如果玩家通过我们的测试服务器喜欢上了这款游戏，请支持正版游戏。官方网站:http://tiantang.qq.com/ </p>
          <p>1.2用户在注册前，应当仔细阅读本协议，同意并遵守本协议方可成为注册会员。</p>
          <p>1.3本协议可由“东方骑士技术团队”随时更新，本站的通知、公告、声明或其它类似内容是本协议的一部分。</p>
          <p>二、服务内容</p>
          <p>2.1《天堂》3.52复古版本的测试与更新，测试服务器为免费模式，我们不会以任何形式参与游戏中。</p>
          <p>2.2测试服务器将会长期的开放，但是我们并不能保证永久开放，因为我们是一个民间自发的小团队，开放测试服务器的目的仅仅是为了测试我们实现得功能，分享我们对于游戏的理解，所以我们并不能保证您通过游戏获得的虚拟财产会永久保存，所以参与测试还是有风险的。</p>

          <p> 三、游戏规定</p>
          <p>3.1玩家有义务保证密码和帐号的安全，请不要注册和别的游戏一样的账号，也不要把你的账号借给别人，账号密码被盗造成的损失，我们不承担任何责任。</p>
          <p>3.2我们原则上并不支持玩家的现金交易，如由于现金交易造成的任何损失，我们不承担任何责任。</p>
          <p>3.3请不要辱骂管理员、不要散布谣言对测试服务器造成不良影响，如果这样，我们有权利封停您的游戏账号，并且不做任何解释，请不要当一个傻逼，尊重别人就是尊重自己。</p>
          <p>3.4请不要在网站、游戏、QQ群等聊天媒介以任何的方式发布色情或者类色情的内容，我们同样会严肃处理。</p>
          <p>3.5如果游戏发现bug，请及时联系管理员。如利用bug或者外挂进行游戏，我们会严惩不待并且永久封停您的账号。</p>
          <p>3.6请不要在网站、游戏。QQ群等聊天媒介散布损害国家利益的言论、谈论邪教组织、买卖毒品。玩游戏就玩游戏，别他妈装逼。如果您这样，我们并不承担责任，但是我们会义务的封停您的账号。</p>
        </div>
        <div className={styles.normal}>
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <FormItem
              {...formItemLayout}
              label="帐号"
              hasFeedback
            >
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: '请输入帐号' }, { pattern: /^[0-9A-Za-z]{6,12}$/, message: '帐号为6—12位英文数字组合' }],
              })(
                <Input placeholder={'请输入帐号'} style={{ width: '242px' }} />
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
                <Input placeholder={'请输入密码'} style={{ width: '242px' }} type="password" />
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
                <Input placeholder={'请确认密码'} style={{ width: '242px' }} type="password" onBlur={null} />
                )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="邮箱"
              hasFeedback
            >
              {getFieldDecorator('email', {
                rules: [{
                  required: true, message: '请输入你的邮箱',
                }, {
                  pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/, message: '请输入正确的邮箱'
                }],
              })(
                <Input placeholder={'请输入你的邮箱'} style={{ width: '242px' }} type="" />
                )}
            </FormItem>
            {/* <FormItem
            {...formItemLayout}
            label="昵称"
            hasFeedback
          >
            {getFieldDecorator('nickName', {
              rules: [{ required: true, message: '请输入昵称', whitespace: true }],
            })(
              <Input />
              )}
          </FormItem> */}

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
                  <Button size="large" onClick={this.getCode.bind(this)}>生成验证</Button>
                </Col>
              </Row>
            </FormItem>
            <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
              {getFieldDecorator('agreement', {
                valuePropName: 'checked',
              })(
                <Checkbox onChange={this.agreement.bind(this)}>我已经看完并同意 <b>用户协议</b> </Checkbox>
                )}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" style={{ width: '243px' }}>确认注册</Button>
            </FormItem>
          </Form>
          {/* <Modal
          title="用户协议"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          maskClosable={false}
        >
          <p>1.必须冲钱。</p>
          <p>2.账号被盗概不负责。</p>
          <p>3.私聊GM购买牛逼装备。</p>
        </Modal> */}
        </div>
      </div>
    );
  }

}

export default Form.create()(RegistForm);
