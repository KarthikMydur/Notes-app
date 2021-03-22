import React from 'react'
import { connect } from 'react-redux'
import 'antd/dist/antd.css';
import { startDeleteNote } from '../../actions/note'
import { Card, Icon } from 'antd';
const { Meta } = Card;



function Bin (props) {

    const handleRemove = (id) => {
        props.dispatch(startDeleteNote(id))
    }

    return (
        <div className = "container d-block">
            <h1>Deleted notes - { props.notes.length }</h1>
                {
                    
                    props.notes.map(note => {
                        return  <Card key = { note._id}
                                    style={{ width: 300, backgroundColor : `${note.color}` }}
                                    cover={
                                    <img
                                        alt="example"
                                        src={`http://localhost:3000/uploads/${note.photo}`}
                                    />
                                    }
                                    actions={[
                                    <Icon type="delete" onClick = {() => { handleRemove(note._id) }}/>,
                                    ]}
                                >
                                    <Meta
                                    title={ note.title }
                                    description={ note.description }
                                    />
                                </Card>
                    })
                }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        notes : state.notes.filter(note => note.deleted)
    }
}

export default connect(mapStateToProps)(Bin)