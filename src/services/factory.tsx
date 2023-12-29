class Factory {
    constructor() { }

    async enviarMensagem(token: string, telefone: string, mensagem: string): Promise<boolean> {
        const endpoint = import.meta.env.VITE_ENDPOINT;

        const url = new URL(endpoint);

        const body = {
            telefone,
            body: mensagem,
        };

        const headers = new Headers();
        headers.append('X_TOKEN', token);
        headers.append('Content-Type', 'application/json');

        const options: RequestInit = {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        };

        try {
            await fetch(url.toString(), options);

            return true;
        } catch (error) {
            return false;
        }
    }

    async enviarArquivo(token: string, telefone: string, arquivo: any): Promise<boolean> {
        const endpoint = import.meta.env.VITE_ENDPOINT;

        const url = new URL(endpoint);

        const formData = new FormData();
        formData.append('number', telefone);
        formData.append('medias', arquivo);

        const headers = new Headers();
        headers.append('X_TOKEN', token);
        headers.append('Content-Type', 'multipart/form-data');

        // Configurar opções da requisição
        const options: RequestInit = {
            method: 'POST',
            headers,
            body: formData,
        };

        try {

            await fetch(url.toString(), options);

            return true;

        } catch (error) {
            return false;
        }
    }
}

export default Factory;
