class NotesHandler {
    constructor(service) {
        this._service = service;
    }
    postNoteHandler(request, h) {
        try {
            const { title = 'untitled', body, tags } = request.payload;
            const noteId = this._service.addNote({ title, body, tags });
            const response = h.response({
                status: 'success',
                message: 'Catatan berhasil ditambahkan',
                data: {
                    noteId,
                },
            });
            response.code(201);
            return response;
        } catch (error) {
            const response = h.response({
                status: 'fail',
                message: error.message,
            });
            response.code(400);
            return response;
        }
    }
    getNotesHandler() {
        const notes = this._service.getNotes();
        return {
            status: 'success',
            data: {
                notes,
            },
        };
    }
    getNoteByIdHandler(request) {
        // ini karena pakai param di URL, jadi tidak perlu ada request.payload
        try {
            const { id } = request.params;
            const note = this._service.getNoteById(id);
            return {
                status: 'success',
                data: {
                    note,
                },
            };
        } catch (error) {
            const response = h.response({
                status: 'fail',
                message: error.message,
            });
            response.code(404);
            return response;
        }
    }
    putNoteByIdHandler() {
    }
    deleteNoteByIdHandler() {

    }
}