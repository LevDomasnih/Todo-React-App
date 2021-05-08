import React from "react";
import {Button, Col, Drawer, Form, Input, Row} from "antd";
import {connect} from "react-redux";
import {addTODO, changeVisible, getTODO, updateTODO} from "../redux/todoReducer";
import {todoType} from "../types/types";
import {AppStateType} from "../redux/reduxStore";

type mapStateToPropsType = {
    todo: Array<todoType>
    visible: boolean
}

type mapDispatchToPropsType = {
    changeVisible: (data: boolean) => void
    addTODO: (todo: todoType) => void
    getTODO: () => void
    updateTODO: (book: todoType) => void
}

type ownPropsType = {
    nullUpdateId: () => void
    updateId: null | number
}

type PropsType = mapDispatchToPropsType & mapStateToPropsType & ownPropsType

type StateType = {}

class CreateToDo extends React.Component<PropsType, StateType> {
    formRef = React.createRef<any>();

    componentDidUpdate(prevProps: mapStateToPropsType, prevState: StateType) {
        if (this.props.updateId === null) return

        const data = this.props.todo.filter((e) => e.id === this.props.updateId)
        this.formRef.current.setFieldsValue(...data);
    }

    onClose = () => {
        this.props.changeVisible(false)
        this.formRef.current.resetFields()
        this.props.nullUpdateId()
    };

    onSubmit = () => {
        if (this.props.updateId === null) {
            this.formRef.current.setFieldsValue({date_create: new Date().toJSON().slice(0, 10)})
            console.log('onSubmit', this.formRef.current.getFieldsValue())
            this.formRef.current.validateFields()
                .then((values: todoType) => {
                    this.onClose()
                    this.props.addTODO(values)
                })
        } else {
            const id = this.props.updateId
            console.log('onSubmitEdit', this.formRef.current.getFieldsValue())
            this.formRef.current.validateFields()
                .then((values: todoType) => {
                    this.onClose()
                    this.props.updateTODO({...values, id})
                })
        }

    }

    render() {
        return (
            <Form
                ref={this.formRef}
                name="create"
                layout={'vertical'}
                labelCol={{span: 24}}
            >
                <Drawer
                    title={(this.props.updateId && "Update TODO") || "Create TODO"}
                    placement={'top'}
                    closable={false}
                    onClose={this.onClose}
                    visible={this.props.visible}
                    footer={
                        <div
                            style={{
                                textAlign: 'right',
                            }}
                        >
                            <Button onClick={this.onClose} style={{marginRight: 8}}>
                                Cancel
                            </Button>
                            <Button onClick={this.onSubmit} type="primary">
                                Submit
                            </Button>
                        </div>
                    }
                >
                    <ToDoForm/>
                </Drawer>
            </Form>
        )
    }
}


const ToDoForm = () => {
    return (
        <Row gutter={[16, 16]}>

            <Form.Item name="date_create"/>

            <Form.Item name="done" initialValue={0}/>

            <Col span={6}>
                <Form.Item
                    label="Username"
                    name="author"
                    initialValue='Lev'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item
                    label="Profession"
                    name="profession"
                    initialValue='FrontEnd'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Profession!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                    label="Task"
                    name="task"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Task!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
            </Col>
        </Row>
    );
};

const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        visible: state.todoStore.drawerVisible,
        todo: state.todoStore.todo
    }
}

export default connect(mapStateToProps, {
    changeVisible,
    addTODO,
    getTODO,
    updateTODO
})(CreateToDo)