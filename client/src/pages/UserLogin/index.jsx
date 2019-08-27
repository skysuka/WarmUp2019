import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Input, Button, Grid, Message } from '@alifd/next';

import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import IceIcon from '@icedesign/foundation-symbol';
import styles from './index.module.scss';

const { Row, Col } = Grid;
const user = require('@/api/user')

const UserRegister = (props) => {
  const [value, setValue] = useState({
    username: '',
    password: '',
    checkbox: false,
  });

  const formChange = (newValue) => {
    setValue(newValue);
  };

  async function handleSubmit() {
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value

    if (email.length == 0) {
      Message.warning('请填写正确的邮箱')
      return 
    } else {
      var pos1 = email.indexOf('@')
      var pos2 = email.indexOf('.')
      if ((pos1<=0) && (pos2-pos1 <= 1) && (email.length-pos2 <= 2)){
        Message.warning('请填写正确的邮箱')
        return
      }
    }
    if ( password.length < 5) {
      Message.warning('请填写正确的密码')
      return 
    }
    const result = await user.login(email, password);
    if (result.statusText == 'ok') {
      Message.success({
        title: result.infoText,
        duration: 1000
      });
      // 注册成功后做对应的逻辑处理
      props.history.push('/home/analysis');
    } else {
      Message.warning({
        title: result.infoText,
        duration: 1000
      })
    }
  }

  return (
    <div className={styles.formContainer}>
      <h4 className={styles.formTitle}>WARM UP 登 录</h4>
      <IceFormBinderWrapper value={value} onChange={formChange}>
        <div className={styles.formItems}>
          <Row className={styles.formItem}>
            <Col className={styles.formItemCol}>
              <IceIcon type="mail" size="small" className={styles.inputIcon} />
              <IceFormBinder name="email" required>
                <Input className="next-input-single" size="large" maxLength={20}  placeholder="输入邮箱" id="email" />
              </IceFormBinder>
            </Col>
            <Col>
              <IceFormError name="email"/>
            </Col>
          </Row>

          <Row className={styles.formItem}>
            <Col className={styles.formItemCol}>
              <IceIcon type="lock" size="small" className={styles.inputIcon} />
              <IceFormBinder name="passwd" required>
                <Input className="next-input-single" htmlType="password" size="large" maxLength={16} placeholder="输入密码" id="password"/>
              </IceFormBinder>
            </Col>
            <Col>
              <IceFormError name="passwd" />
            </Col>
          </Row>

          <Row className={styles.formItem}>
            <Button type="primary" onClick={handleSubmit} className={styles.submitBtn}>
              登 录
            </Button>
          </Row>

          {/* <Row className={styles.tips}>
            <Link to="/user/register" className={styles.tipsText}>
              注册新账户
            </Link>
          </Row> */}
        </div>
      </IceFormBinderWrapper>
    </div>
  );

};

export default withRouter(UserRegister);
