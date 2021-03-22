import React from 'react'
import { connect } from 'react-redux'
import 'antd/dist/antd.css';
import { startArchiveNote, startBinNote } from '../../actions/note'
import { Card, Icon } from 'antd';
const { Meta } = Card;



function Archives (props) {

    const handleArchiveNote = (note) => {
        props.dispatch(startArchiveNote(note))
    }

    const handleBinNote = (note) => {
        props.dispatch(startBinNote(note))
    }

    return (
        <div className = "container d-block">
            <h1>Archived notes - { props.notes.length }</h1>
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
                                    <Icon type="import" onClick = {() => { handleArchiveNote(note)}}/>,
                                    <Icon type="delete" onClick = {() => { handleBinNote(note) }}/>
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
        notes : state.notes.filter(note => note.archived)
    }
}

export default connect(mapStateToProps)(Archives)