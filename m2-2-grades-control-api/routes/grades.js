import express from 'express';
import { promises as fs, read } from 'fs';

const { writeFile, readFile } = fs;
const router = express.Router();

// 1 - Criar uma grade, recebe: student, subject, type e value
router.post('/', async (req, res, next) => {
    try {
        let grade = req.body;
        if (
            !grade.student ||
            !grade.subject ||
            !grade.type ||
            grade.value === null
        ) {
            throw new Error('Campos obrigatórios não preenchidos!');
        }
        const data = await readFile(global.fileName);
        const json = JSON.parse(data);
        grade = {
            id: json.nextId++,
            student: grade.student,
            subject: grade.subject,
            type: grade.type,
            value: grade.value,
            timestamp: new Date(),
        };
        json.grades.push(grade);
        await writeFile(global.fileName, JSON.stringify(json, null, 2));

        res.send(grade);

        logger.info(`POST /grade - ${JSON.stringify(grade)}`);
    } catch (error) {
        next(error);
    }
});

// 2 - Atualizar uma grade, recebe: id, student, subject, type e value
router.put('/', async (req, res, next) => {
    try {
        const grade = req.body;
        console.log(grade.id);
        if (
            !grade.id ||
            !grade.student ||
            !grade.subject ||
            !grade.type ||
            grade.value === null
        ) {
            throw new Error('Campos obrigatórios não preenchidos!');
        }
        const data = JSON.parse(await readFile(global.fileName));
        const index = data.grades.findIndex((g) => g.id === grade.id);

        if (index === -1) {
            throw new Error('Registro não encontrado!');
        }
        data.grades[index].student = grade.student;
        data.grades[index].subject = grade.subject;
        data.grades[index].type = grade.type;
        data.grades[index].value = grade.value;

        await writeFile(global.fileName, JSON.stringify(data, null, 2));

        res.send(data.grades[index]);

        logger.info(`PUT /grade - ${JSON.stringify(grade)}`);
    } catch (error) {
        next(error);
    }
});

// 3 -Excluir uma grade, recebe: id
router.delete('/:id', async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        data.grades = data.grades.filter(
            (grade) => grade.id !== parseInt(req.params.id)
        );
        await writeFile(global.fileName, JSON.stringify(data, null, 2));

        res.end();
        logger.info(`DELETE /grades/:id - ${req.params.id}`);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// 4 - Consultar uma grade em específico, recebe: id
router.get('/:id', async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        const grade = data.grades.find(
            (grade) => grade.id === parseInt(req.params.id)
        );
        if (!grade) {
            throw new Error('Registro não encontrado!');
        }
        res.send(grade);
        logger.info(`GET /grades/id - ${req.params.id}`);
    } catch (error) {
        next(error);
    }
});

// (Extra) - Retorna todos os dados
router.get('/', async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        delete data.nextId;
        res.send(data.grades);
        logger.info('GET /grades - all returned');
    } catch (error) {
        next(error);
    }
});

// 5 - Consultar a nota total do aluno, recebe: student e subject
router.get('/student/note', async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        const { student, subject } = req.body;

        if (!student || !subject) {
            throw new Error('Campos obrigatórios não preenchidos!');
        }
        const grade = data.grades.filter(
            (item) =>
                item.student.toLowerCase() == student.toLowerCase() &&
                item.subject.toLowerCase() == subject.toLowerCase()
        );
        if (!grade || grade.length === 0) {
            throw new Error('Registro não encontrado!');
        }
        const soma = [
            { soma: grade.reduce((acc, curr) => acc + curr.value, 0) },
        ];

        res.send(soma);
        logger.info(`GET /account/student/note - ${student}/${subject}`);
    } catch (error) {
        next(error);
    }
});

// 6 - Média das grades, recebe: subject e type
router.get('/subject/media', async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        const { subject, type } = req.body;

        if (!subject || !type) {
            throw new Error('Campos obrigatórios não preenchidos!');
        }
        const grade = data.grades.filter(
            (item) =>
                item.subject.toLowerCase() == subject.toLowerCase() &&
                item.type.toLowerCase() === type.toLowerCase()
        );
        if (!grade || grade.length === 0) {
            throw new Error('Nenhum registro encontrado!');
        }
        const media = [
            {
                media:
                    grade.reduce((acc, curr) => acc + curr.value, 0) /
                    grade.length,
            },
        ];

        res.send(media);
        logger.info(`GET /account/student/note - ${subject}/${type}`);
    } catch (error) {
        next(error);
    }
});

// 7 - Três melhores grades, recebe:subject e type - do maior para o menor
router.get('/subject/best', async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        const { subject, type } = req.body;

        if (!subject || !type) {
            throw new Error('Campos obrigatórios não preenchidos!');
        }
        const filteredeGrades = data.grades.filter(
            (item) =>
                item.subject.toLowerCase() == subject.toLowerCase() &&
                item.type.toLowerCase() === type.toLowerCase()
        );
        if (!filteredeGrades || filteredeGrades.length === 0) {
            throw new Error('Nenhum registro encontrado!');
        }
        const topMoreValues = filteredeGrades
            .sort((a, b) => b.value - a.value)
            .slice(0, 3);

        res.send(topMoreValues);
        logger.info(`GET /account/student/note - ${subject}/${type}`);
    } catch (error) {
        next(error);
    }
});
//

//

router.use((err, req, res, next) => {
    global.logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
    res.status(400).send({ error: err.message });
});

export default router;
