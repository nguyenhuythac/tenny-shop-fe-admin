import CategoryService from "../../service/categoryService";
import { CATEGORIES_SET, CATEGORY_DELETE, CATEGORY_SET, CATEGORY_STATE_CLEAR, COMMON_ERROR_SET, COMMON_LOADING_SET, COMMON_MESSAGE_SET } from "./actionTypes";

export const insertCategory = (category, navigate) => async (dispatch) => {
    const service = new CategoryService();

    try {
        console.log('insert category');

        dispatch({ type: COMMON_LOADING_SET, payload: true });
        const response = await service.insertCategory(category);
        if(response.status === 200 || response.status === 201) {
            dispatch({
                type: CATEGORY_SET,
                payload: response.data,
            });
            dispatch({
                type: COMMON_MESSAGE_SET,
                payload: 'Category inserted successfully',
            });
            console.log('Category inserted successfully:', response.data);
        } else {
            dispatch({
                type: COMMON_ERROR_SET,
                payload: response.message,
            });
            console.error('Failed to insert category:', response);
        }
    } catch (error) {
        dispatch({
            type: COMMON_ERROR_SET,
            payload: error.response.data ? error.response.data.message : error.message,
        });
        console.error('Error inserting category:', error);
    }
    dispatch({ type: COMMON_LOADING_SET, payload: false });
    navigate('/categories/list');
}

export const getCategories = () => async (dispatch) => {
    const service = new CategoryService();

    try {
        console.log('get categories');
        dispatch({ type: COMMON_LOADING_SET, payload: true });
        const response = await service.getCategories();
        console.log(response);
        if(response.status === 200) {
            dispatch({
                type: CATEGORIES_SET,
                payload: response.data,
            });
        } else {
            dispatch({
                type: COMMON_ERROR_SET,
                payload: 'Failed to get categories',
            });
            console.error('Failed to get categories: ', response);
        }
        
    } catch (error) {
        dispatch({
            type: COMMON_ERROR_SET,
            payload: error.response.data ? error.response.data.message : error.message,
        });
        console.error('Error fetching categories:', error);
    }
    dispatch({ type: COMMON_LOADING_SET, payload: false });
}

export const deleteCategory = (id) => async (dispatch) => {
    const service = new CategoryService();

    try {
        console.log('delete category');
        dispatch({ type: COMMON_LOADING_SET, payload: true });
        const response = await service.deleteCategory(id);
        console.log(response);
        if(response.status === 200) {
            dispatch({
                type: COMMON_MESSAGE_SET,
                payload: `Delete category with id: ${id} successfully`,
            });
            dispatch({
                type: CATEGORY_DELETE,
                payload: id,
            });
        } else {
            dispatch({
                type: COMMON_ERROR_SET,
                payload: 'Failed to delete category',
            });
            console.error('Failed to delete category: ', response);
        }
        
    } catch (error) {
        dispatch({
            type: COMMON_ERROR_SET,
            payload: error.response.data ? error.response.data.message : error.message,
        });
        console.error('Error fetching categories:', error);
    }
    dispatch({ type: COMMON_LOADING_SET, payload: false });
}

export const getCategory = (id) => async (dispatch) => {
    const service = new CategoryService();

    try {
        console.log('get category');
        dispatch({ type: COMMON_LOADING_SET, payload: true });
        const response = await service.getCategory(id);
        console.log(response);
        if(response.status === 200) {
            dispatch({
                type: CATEGORY_SET,
                payload: response.data,
            });
        } else {
            dispatch({
                type: COMMON_ERROR_SET,
                payload: 'Failed to get category',
            });
            console.error('Failed to get category: ', response);
        }

    } catch (error) {
        dispatch({
            type: COMMON_ERROR_SET,
            payload: error.response.data ? error.response.data.message : error.message,
        });
        console.error('Error fetching category:', error);
    }
    dispatch({ type: COMMON_LOADING_SET, payload: false });
}

export const updateCategory = (id, category, navigate) => async (dispatch) => {
    const service = new CategoryService();

    try {
        console.log('update category');

        dispatch({ type: COMMON_LOADING_SET, payload: true });

        const response = await service.updateCategory(id, category);
        console.log(response);
        if(response.status === 201) {
            dispatch({
                type: CATEGORY_SET,
                payload: response.data,
            });
            dispatch({
                type: COMMON_MESSAGE_SET,
                payload: `Category with id: ${id} is updated successfully`,
            });
        } else {
            dispatch({
                type: COMMON_ERROR_SET,
                payload: 'Failed to update category',
            });
            console.error('Failed to update category: ', response);
        }

    } catch (error) {
        dispatch({
            type: COMMON_ERROR_SET,
            payload: error.response.data ? error.response.data.message : error.message,
        });
        console.error('Error update category:', error);
    }
    dispatch({ type: COMMON_LOADING_SET, payload: false });
    navigate('/categories/list');
}   

export const clearCategoryState = () => (dispatch) => {
    dispatch({
        type: CATEGORY_STATE_CLEAR,
    });
}

export const clearCategory = () => (dispatch) => {
    dispatch({
        type: CATEGORY_SET,
        payload:{
            id:'',
            name:'',
            status:'Visible',
        }
    });
}
