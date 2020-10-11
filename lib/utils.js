const getTimeStamp = () => {
    const date = new Date();
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate().toString().padStart(2, '0')
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    const timeStamp = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
    return timeStamp
    // const timeStamp = new Date(now).toISOString()
    // console.log(`time stamp: ${timeStamp}`)
    // return Promise.resolve(timeStamp)
}

export { getTimeStamp }