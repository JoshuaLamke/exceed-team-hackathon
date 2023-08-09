import React from "react";
import {Button, Form, Modal} from "react-bootstrap";
import z from "zod";
import {useForm} from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import axios from "axios";
import { ErrorMessage } from '@hookform/error-message';

const TaskModal = ({
    task,
    title,
    action,
    show,
    setShow,
    user,
}) => {
    const update = async (task) => {
        await axios.put(`http://localhost:3000/tasks/${task.id}`, {
            ...task
        });
        setShow(false);
    }
    const add = async (task) => {
        task = {
            ...task,
            due_date: Date.parse(task.due_date),
            priority: task.priority?.value,
            user_id: user.id,
        }
        console.log(task)
        await axios.post(`http://localhost:3000/tasks`, {
            ...task
        });
        setShow(false);
    }

    const formMethods = useForm({
        defaultValues: {
            priority: {
                value: "LOW",
            },
            ...task,
        },
        resolver: zodResolver(z.object({
            duration: z.number(),
            title: z.string().min(1),
            description: z.string(),
            priority: z.object({
                value: z.string()
            }).passthrough(),
            due_date: z.string(),
            category: z.string(),
            recurring_interval: z.number().optional(),
        })),
    })
    console.log(formMethods.formState.errors)
    return (
        <Modal show={show} centered  className="d-flex flex-column" onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <form id="form" onSubmit={formMethods.handleSubmit((task) => {
                        action === "add" ? add(task) : update(task);
                    })}>
                        <Form.Group className="mb-3" controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control {...formMethods.register("title")} />
                            <ErrorMessage errors={formMethods.formState.errors} name={"title"}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control {...formMethods.register("description")} />
                            <ErrorMessage errors={formMethods.formState.errors} name={"description"}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Select value={formMethods.watch("priority")} onChange={(e) => formMethods.setValue("priority", {value: e.target.value})}>
                                <option value="LOW">LOW</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HIGH">HIGH</option>
                            </Form.Select>
                            <ErrorMessage errors={formMethods.formState.errors} name={"priority"}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDuration">
                            <Form.Label>Duration</Form.Label>
                            <Form.Control type="number" {...formMethods.register("duration", {valueAsNumber: true})} />
                            <ErrorMessage errors={formMethods.formState.errors} name={"duration"}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDueDate">
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control type="date" {...formMethods.register("due_date")} />
                            <ErrorMessage errors={formMethods.formState.errors} name={"due_date"}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Control {...formMethods.register("category")} />
                            <ErrorMessage errors={formMethods.formState.errors} name={"category"}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="recurring">
                            <Form.Label>Recurring Interval</Form.Label>
                            <Form.Control type="number" {...formMethods.register("recurring_interval", {setValueAs: (val) => val ? parseInt(val) : undefined})} />
                            <ErrorMessage errors={formMethods.formState.errors} name={"recurring_interval"}/>
                        </Form.Group>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShow(false)}>
                        Cancel
                    </Button>
                    <Button type="submit" form="form">
                        Submit
                    </Button>
                </Modal.Footer>
        </Modal>
    )
}

export default TaskModal;