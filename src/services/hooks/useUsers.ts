import { useQuery } from "react-query";
import { api } from "../api";

type GetUsersResponse = {
    alunos: Aluno[];
}

type GetAlunoResponse = {
   data: Aluno;
}

type Aluno = {
    alnCod: number;
    alnName: string,
    alnEmail: string,
    alnDtaRegister: string,
}
export async function getUsers(page: number): Promise<GetUsersResponse> {
    const data = await api.get('alunos')
    console.log(data)
    const totalCount = 10;

    const alunos = data.data.content.map(user => {
        return {
            alnCod: user.alnCod,
            alnName: user.alnName,
            alnEmail: 'gmail@abc.com',
            alnDtaRegister: new Date(user.alnDtaRegister).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        };
    })

    return {
        alunos
    };
}

export async function getUserFindById(id: number): Promise<Aluno> {
    const {data} = await api.get(`alunos/${id}`)
    console.log(data.data)

    return data;
}

export function useUsers(page: number) {
    return useQuery(['alunos', page], () => getUsers(page), {
        staleTime: 1000 * 60 * 10,
    })
}

export function useUsersFindById(id: number) {
    return useQuery(['alunos', id], () => getUserFindById(id), {
        staleTime: 1000 * 60 * 10,
    })
}