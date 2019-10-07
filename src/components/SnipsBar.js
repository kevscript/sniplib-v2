import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'

import {
  setViewMode,
  setSelectedSnippet,
  setEditList,
  openConfirmDeleteListModal,
  setSelectedList
} from '../actions'

import AddIcon from '../assets/addDark.svg'
import DeleteIcon from '../assets/deleteDark.svg'
import EditIcon from '../assets/editDark.svg'

const Container = styled.div`
  min-height: 100vh;
  height: 100%;
  background: whitesmoke;
  width: 300px;
  border-right: 1px solid rgba(0,0,0,0.2);
`

const Header = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  padding: 10px 25px;
`

const ActionsContainer = styled.div`
  display: flex;
  position: relative;
`

const IconContainer = styled.div`
  cursor: pointer;
  width: 15px;
  height: 15px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  &:not(:last-child) {
    margin-right: 15px;
  }
`

const Title = styled.h3`
  font-size: 16px;
  font-weight: 500;
`

const Icon = styled.img`
  display: block;
  width: auto;
  height: 100%;
`

const SnipsContainer = styled.ul``

const TooltipText = styled.span`
  color: ${props => props.dark ? '#333' : 'inherit'};
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-size: 12px;
    color: #333;
    font-style: italic;
  }
`

const SnipItem = styled.li`
  width: 100%;
  background: ${props => props.isSelected ? '#fff' : 'transparent'};
  display: flex;
  align-items: center;
  padding: 15px;
  font-size: 14px;
  cursor: pointer;
  border-bottom: 1px solid rgba(0,0,0,0.1);
`

const Hint = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #bbb;
  padding: 25px;
`


const SnipsBar = ({ lists, snippets, setViewMode, deleteList, setSelectedSnippet, setSelectedList, setEditList, openConfirmDeleteListModal }) => {

  const { allLists } = lists
  let selectedList = allLists.find(x => x.selected === true)
  const { viewMode, allSnippets } = snippets

  const handleAddClick = () => {
    if (viewMode !== 'create') {
      setViewMode('create')
    }
  }

  const handleSnippetSelection = (e) => {
    if (e.target.getAttribute('data-selected') === 'false') {
      const id = parseInt(e.target.getAttribute('data-id'))
      setSelectedSnippet(id)
      if (viewMode !== 'read') {
        setViewMode('read')
      }
    }
  }

  if (allLists.length === 0) {
    return (
      <Container>
        <Hint>Create a List to start adding snippets :)</Hint>
      </Container>
    )
  }

  if (!selectedList) {
    return (
      <Container>
        <Hint>Select a List or create a new one :)</Hint>
      </Container>
    )
  }

  return (
    <Container>
      <Header>
        <TitleContainer>
          <Title>{selectedList.name}</Title>
          <span>{allSnippets.filter(x => x.parentId === selectedList.createdAt).length} snippets</span>
        </TitleContainer>
        <ActionsContainer>
          <IconContainer onClick={handleAddClick}>
            <Icon src={AddIcon} data-tip data-for="addSnippet" />
            <ReactTooltip id='addSnippet' type='dark' place='bottom'>
              <TooltipText>Add Snippet</TooltipText>
            </ReactTooltip>
          </IconContainer>
          <IconContainer onClick={setEditList}>
            <Icon src={EditIcon} data-tip data-for="editList" />
            <ReactTooltip id='editList' type='dark' place='bottom'>
              <TooltipText>Edit List</TooltipText>
            </ReactTooltip>
          </IconContainer>
          {
            allLists.length > 1

              ? (
                <IconContainer onClick={openConfirmDeleteListModal}>
                  <Icon src={DeleteIcon} data-tip data-for="deleteList" />
                  <ReactTooltip id='deleteList' type='warning' place='bottom'>
                    <TooltipText dark>Delete List</TooltipText>
                  </ReactTooltip>
                </IconContainer>
              )

              : null
          }
        </ActionsContainer>
      </Header>
      <SnipsContainer>
        {
          allSnippets.filter(x => x.parentId === selectedList.createdAt).length > 0

            ? allSnippets.filter(x => x.parentId === selectedList.createdAt).map(x => {
              return (
                <SnipItem
                  key={x.createdAt}
                  data-id={x.createdAt}
                  data-selected={x.selected}
                  isSelected={x.selected}
                  onClick={handleSnippetSelection}
                >
                  {x.name}
                </SnipItem>
              )
            })

            : <Container>
              <Hint>Your list is empty, time to add some snippets.</Hint>
            </Container>
        }
      </SnipsContainer>
    </Container>
  )
}

const mapStateToProps = state => ({
  lists: state.lists,
  snippets: state.snippets
})

const mapDispatchToProps = {
  setViewMode,
  openConfirmDeleteListModal,
  setSelectedSnippet,
  setEditList,
  setSelectedList
}

export default connect(mapStateToProps, mapDispatchToProps)(SnipsBar)