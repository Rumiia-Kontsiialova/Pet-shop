import { Form, Input, Button, message } from 'antd';
import PetsImg from '../../assets/png/pets-byDiscountForm.png';
import styles from './DiscountForm.module.css';
import axios from 'axios';
import { useState, useRef } from 'react';

const DiscountForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const formKeyRef = useRef(0); // Для принудительного ремонтирования формы

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3333/sale/send', values);
      if (response.status === 200) {
        message.success('You received 5% discount on email');
        // Полный сброс формы
        form.resetFields();
        // Принудительное обновление формы
        formKeyRef.current += 1;
      }
    } catch (error) {
      message.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>5% off on the first order</h2>
      <div className={styles.content}>
        <img src={PetsImg} alt="pets" />
        <Form
          key={`form_${formKeyRef.current}`} // Ключ для принудительного обновления
          form={form}
          name="discount"
          layout="vertical"
          onFinish={onFinish}
          className={styles.form}
          initialValues={{ name: '', phone: '', email: '' }} // Явные начальные значения
        >
          <Form.Item
            name="name"
            rules={[
              { required: true, message: 'Enter your name' },
              { pattern: /^[a-zA-Zа-яА-ЯёЁ\s-]{2,30}$/, message: 'Letters only, 2-30 characters' },
            ]}
          >
            <Input placeholder="Name" className={styles.input} allowClear />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[
              { required: true, message: 'Enter your phone number' },
              { pattern: /^\d{10,15}$/, message: 'Enter a number from 10 to 15 digits' },
            ]}
          >
            <Input placeholder="Phone number" className={styles.input} allowClear />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Enter email' },
              { type: 'email', message: 'Invalid email format' },
            ]}
          >
            <Input placeholder="Email" className={styles.input} allowClear />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.formBtn}
              loading={loading}
              disabled={loading}
            >
              Get a discount
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default DiscountForm;