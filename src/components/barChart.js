import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DataApi from '../api/Api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function BarStats(){
  const {id} = useParams()
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const call = new DataApi()
  useEffect(() => {
    call.get(id, '/activity')
    .then(function (res){
      setData(res)
      setIsLoading(false)
    },[isLoading, data])
  })
  return(
    <>{!isLoading && (
      <div className='barchart'>
        <ResponsiveContainer width="100%" aspect={3}>
          <BarChart
            width={500}
            height={300}
            data={data.sessions}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid horizontal="true" vertical="" strokeDasharray="3" />
            <XAxis axisLine={false} tickLine={false} dataKey="day" />
            <YAxis axisLine={false} tickLine={false} orientation="right" />
            <Tooltip />
            <Legend verticalAlign='top' align='right' height={70} iconType='circle'/>
            <Bar barSize={7} radius={[10, 10, 0, 0]} dataKey="kilogram" fill="#282D30" />
            <Bar barSize={7} radius={[10, 10, 0, 0]} dataKey="calories" fill="#E60000" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )}</>
  )
}
export default BarStats
