import React from "react";
import {Button, Layout, Popconfirm, Space, Table} from "antd";
import {Content} from "antd/lib/layout/layout";
import {connect} from "react-redux";
import CreateToDo from "./Components/CreateToDo";
import {changeVisible, deleteTODO, getTODO, setTODOData, updateTODO} from "./redux/todoReducer";

class Todo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            updateId: null
        }
    }

    showDrawer = (id = null) => {
        this.props.changeVisible(true)

        this.setState({
            updateId: id
        })
    };

    nullUpdateId = () => {
        this.setState({
            updateId: null
        })
    }

    componentDidMount() {
        this.props.getTODO()
    }


    render() {
        const data = this.props.todo;
        const {showDrawer} = this

        const handleDelete = (id) => {
            this.props.deleteTODO(id)
        }

        const handleChange = (id) => {
            const data = this.props.todo;

            let item = data.filter((item) => item.id === id)

            this.props.updateTODO({...item[0], done: item[0].done == 0 ? '1' : '0'})
        };


        const columns = [
            {
                title: 'Name',
                key: 'author',
                editable: true,
                render(text, record) {
                    let style = record.done == 0 ? {'background': '#fff'} : {'background': '#ddd'}
                    return {
                        props: {
                            style: style,
                        },
                        children: <div>{text.author}</div>,
                    };
                },
            },
            {
                title: 'Date create',
                key: 'date_create',
                render(text, record) {
                    let style = record.done == 0 ? {'background': '#fff'} : {'background': '#ddd'}
                    return {
                        props: {
                            style: style,
                        },
                        children: <div>{text.date_create}</div>,
                    };
                },
            },
            {
                title: 'Profession',
                key: 'profession',
                render(text, record) {
                    let style = record.done == 0 ? {'background': '#fff'} : {'background': '#ddd'}
                    return {
                        props: {
                            style: style,
                        },
                        children: <div>{text.profession}</div>,
                    };
                },
            },
            {
                title: 'Task',
                key: 'task',
                render(text, record) {
                    let style = record.done == 0 ? {'background': '#fff'} : {'background': '#ddd'}
                    return {
                        props: {
                            style: style,
                        },
                        children: <div>{text.task}</div>,
                    };
                },
            },

            {
                title: 'Action',
                key: 'action',
                fixed: 'right',
                width: 100,
                render(text, record, key) {
                    let style = record.done == 0 ? {'background': '#fff'} : {'background': '#ddd'}
                    return {
                        props: {
                            style: style,
                        },
                        children: (
                            <Space size="middle">
                                {record.done == 0 ?
                                    <Button type="primary" style={{backgroundColor: 'green', borderColor: 'green'}}
                                            danger onClick={() => handleChange(record.id)}>Done</Button> :
                                    <Button type="dashed" style={{color: 'green', borderColor: 'green'}} danger
                                            onClick={() => handleChange(record.id)}>Undone</Button>}
                                <Button
                                    type="primary"
                                    disabled={record.date_create !== new Date().toJSON().slice(0, 10)}
                                    onClick={() => showDrawer(record.id)} block
                                >
                                    Update
                                </Button>
                                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
                                    <Button type="primary" block danger>Delete</Button>
                                </Popconfirm>


                            </Space>
                        )
                    };
                },
            },
        ];


        return (
            <>
                <Layout className="site-layout">
                    <Content style={{margin: "16px", minHeight: 940}}>
                        <Button style={{marginBottom: 16}} onClick={() => this.showDrawer()} type="primary">Create TODO</Button>
                        <Table columns={columns}
                               dataSource={data.sort((a, b) => b.id - a.id)}
                               pagination={{
                                   position: ['bottomLeft'],
                                   pageSize: 14
                               }}
                        />
                    </Content>
                </Layout>
                <CreateToDo nullUpdateId={this.nullUpdateId} updateId={this.state.updateId}/>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todo: state.todoStore.todo,
    }
}

export default connect(mapStateToProps, {
    changeVisible,
    setTODOData,
    deleteTODO,
    updateTODO,
    getTODO,
})(Todo);
