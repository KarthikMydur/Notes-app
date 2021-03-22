import React from 'react'
import { connect } from 'react-redux'
import 'antd/dist/antd.css';
import { startPinNote, startBinNote, startArchiveNote } from '../../actions/note'
import { Card, Icon } from 'antd';
const { Meta } = Card;



function ListNote (props) {

    const handleClick = (note) => {
        props.dispatch(startPinNote(note))
       
    }

    const handleArchiveNote = (note) => {
        props.dispatch(startArchiveNote(note))
    }

    const handlePushToBin = (note) => {
        props.dispatch(startBinNote(note))
    }
 

    const pinned = props.notes.filter(note => note.pinned)
    const unPinned = props.notes.filter(note => !note.pinned)

    return (
        <div className = "container">
            <h1>Listing notes - { props.notes.length }</h1>
                <div className = "row">
                    {
                    pinned.map(note => {
                        return  <div className = "col-md-4">
                                     <Card key = { note._id}
                                    style={{ width: 300, backgroundColor : `${note.color}` }}
                                    cover={
                                    <img
                                        alt="example"
                                        src={`http://localhost:3000/uploads/${note.photo}`}
                                    />
                                    }
                                    actions={[
                                    <Icon type="edit" onClick = {() => { props.history.push(`/notes/edit/${note._id}`)} }/>,
                                    <Icon type="pushpin" theme ="filled" onClick = {() => { handleClick(note) }} />,
                                    <Icon type="delete" onClick = {() => { handlePushToBin(note) }}/>,
                                    <Icon type="export" onClick = {() => { handleArchiveNote(note)}}/>,
                                    ]}
                                >
                                    <Meta
                                    title={ note.title }
                                    description={ note.description }
                                    />
                                </Card>
                                </div>

                           
                    })
                }
                {
                    unPinned.map(note => {
                        return  <div className = "col-md-4">
                                    <Card key = { note._id }
                                        style={{ width: 300, backgroundColor : `${note.color}` }}
                                        cover={
                                        <img
                                            alt="example"
                                            src={`http://localhost:3000/uploads/${note.photo}`}
                                        />
                                        }
                                        actions={[
                                        <Icon type="edit" onClick = {() => { props.history.push(`/notes/edit/${note._id}`)} }/>,
                                        <Icon type="pushpin"  onClick = {() => { handleClick(note) }}/>,
                                        <Icon type="delete" onClick = {() => { handlePushToBin(note) }}/>,
                                        <Icon type="export" onClick = {() => { handleArchiveNote(note)}}/>,
                                        ]}
                                    >
                                        <Meta
                                        title={ note.title }
                                        description={ note.description }
                                        />
                                    </Card>
                                    </div>
                    })
                       
                       
                }
                </div>
            <button className = "btn btn-primary" onClick = {() => { props.history.push('/notes/new')}}>Add a new note</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    const notes = state.notes.filter(note => !note.deleted).filter(note => !note.archived)
    return {
        notes 
    }
}

export default connect(mapStateToProps)(ListNote)