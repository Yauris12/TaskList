import './task.css'
import useResize from '../../../hooks/useResize'
import React, { useState } from 'react'
import Header from '../../Header/Header'
import Card from '../../Card/Card'
import TaskForm from '../../TaskForm/TaskForm'
import { useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import debounce from 'lodash.debounce'
import { useSelector, useDispatch } from 'react-redux'
import {
  getTasks,
  deleteTask,
  editTaskStatus,
} from '../../../store/actions/tasksAction'

const Tasks = () => {
  const { isPhone } = useResize()
  const [list, setList] = useState(null)
  const [renderList, setRenderList] = useState(null)
  const [search, setSearch] = useState('')
  const [taskFromWho, setTaskFromWho] = useState('ALL')

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTasks(taskFromWho === 'ME' ? '/me' : ''))
  }, [taskFromWho])

  const { loading, error, tasks } = useSelector((state) => {
    return state.tasksReducer
  })

  useEffect(() => {
    if (tasks?.length) {
      setList(tasks)
      setRenderList(tasks)
    }
  }, [tasks])

  useEffect(() => {
    if (search) {
      setRenderList(list.filter((data) => data.title.startsWith(search)))
    } else setRenderList(list)
  }, [search])

  const renderAllCard = () => {
    return renderList?.map((data) => (
      <Card
        key={data._id}
        data={data}
        deleteCard={handleDelete}
        editCardStatus={handleEditCardStatus}
      />
    ))
  }
  const renderColumnCards = (renderColumnCards) => {
    return renderList
      ?.filter((data) => data.status === renderColumnCards)
      .map((data) => (
        <Card
          key={data._id}
          data={data}
          deleteCard={handleDelete}
          editCardStatus={handleEditCardStatus}
        />
      ))
  }

  const handleChangeImportance = (e) => {
    console.log(e.currentTarget.value)
    if (e.currentTarget.value == 'ALL') {
      setRenderList(list)
      console.log('hello')
    } else
      setRenderList(
        list.filter((data) => data.importance === e.currentTarget.value)
      )
  }

  const handleSearch = debounce((e) => {
    setSearch(e?.target?.value)
  }, 1000)

  const handleDelete = (id) => {
    dispatch(deleteTask(id))
  }
  const handleEditCardStatus = (data) => {
    dispatch(editTaskStatus(data))
  }

  if (error) return <div>Hay un error</div>

  return (
    <>
      <Header />
      <main id='tasks'>
        <TaskForm />

        <section className='wrapper_list'>
          <div className='list_header'>
            <h2>Mis tareas</h2>
          </div>

          <div className='filters'>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                onChange={(e) => {
                  setTaskFromWho(e.currentTarget.value)
                }}
              >
                <FormControlLabel
                  value='ALL'
                  control={<Radio />}
                  label='Todas'
                />
                <FormControlLabel
                  value='ME'
                  control={<Radio />}
                  label='Mis tareas'
                />
              </RadioGroup>
            </FormControl>
            <div className='search'>
              <input
                type='text'
                placeholder='Buscar por título...'
                onChange={handleSearch}
              />
            </div>
            <select name='importance' onChange={handleChangeImportance}>
              <option value=''>Seleccionar una prioridad</option>
              <option value='ALL'>Todas</option>
              <option value='LOW'>Baja</option>
              <option value='MEDIUM'>Media</option>
              <option value='HIGH'>Alta</option>
            </select>
          </div>

          {isPhone ? (
            !renderList?.length ? (
              <div>No hay tareas creadas</div>
            ) : (
              <div className='list phone'>{renderAllCard()}</div>
            )
          ) : loading ? (
            <>
              <Skeleton height={90} />
              <Skeleton height={90} />
              <Skeleton height={90} />
            </>
          ) : (
            <div className='list_group'>
              {!renderList?.length ? (
                <div>No hay tareas creadas</div>
              ) : loading ? (
                <>
                  <Skeleton height={90} />
                </>
              ) : (
                <>
                  <div className='list '>
                    <h4>Nuevas</h4>
                    {renderColumnCards('NEW')}
                  </div>
                  <div className='list '>
                    <h4>En proceso</h4>
                    {renderColumnCards('IN PROGRESS')}
                  </div>
                  <div className='list '>
                    <h4>Finalizadas</h4>
                    {renderColumnCards('FINISHED')}
                  </div>
                </>
              )}
            </div>
          )}
        </section>
      </main>
    </>
  )
}

export default Tasks
