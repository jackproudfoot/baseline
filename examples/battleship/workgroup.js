import Randexp from 'randexp'

export const workgroup = (io) => {
    const codeRegExp = new Randexp(/([A-Z0-9]){4}/)

    let workgroups = []

    io.on('connection', ( socket ) => {
        console.log('user connected')

        /**
         * Generate a new workgroup id and add socket to room
         */
        socket.on('workgroup:create', () => {
            let id = codeRegExp.gen()

            while (workgroups.includes(id)) {
                id = codeRegExp.gen()
            }
            workgroups.push(id)

            console.log(socket.id, ' creating workgroup: ', id)

            socket.emit('workgroup:id', id)
            socket.join(id)
        })
    
        /**
         * Connect socket to workgroup
         */
        socket.on('workgroup:join', (id) => {
            if (workgroups.includes(id)) {
                
                console.log(socket.id, ' joining workgroup ', id)

                socket.join(id)
                io.to(id).emit('game:init', id)
            }
            else {
                console.log(socket.id, ' tried to join invalid workgroup ', id)

                socket.emit('workgroup:invalid_id', id)
            }
        })
    })

    
}