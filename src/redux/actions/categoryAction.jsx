import CategoryService from "../../service/categoryService";

export const insertCategory = (category, navigate) => async (dispatch) => {
    const service = new CategoryService();

    try {
        console.log('insert category');
        const response = await service.insertCategory(category);
        if(response.status === 200 || response.status === 201) {
            dispatch({
                type: 'CATEGORY_SET',
                payload: response.data,
            });
            dispatch({
                type: 'COMMON_MESSAGE_SET',
                payload: 'Category inserted successfully',
            });
            console.log('Category inserted successfully:', response.data);
        } else {
            dispatch({
                type: 'COMMON_ERROR_SET',
                payload: 'Failed to insert category',
            });
            console.error('Failed to insert category:', response);
        }
    } catch (error) {
        console.error('Error inserting category:', error);
    }

    navigate('/categories/list');
}

export const getCategories = () => async (dispatch) => {
    const service = new CategoryService();

    try {
        console.log('get categories');
        const response = await service.getCategories();
        console.log(response);
        if(response.status === 200) {
            
            dispatch({
                type: 'CATEGORIES_SET',
                payload: response.data,
            });
        } else {
            dispatch({
                type: 'COMMON_ERROR_SET',
                payload: 'Failed to get categories',
            });
            console.error('Failed to get categories: ', response);
        }
        
    } catch (error) {
        dispatch({
            type: 'COMMON_ERROR_SET',
            payload: error,
        });
        console.error('Error fetching categories:', error);
    }
}

export const clearCategoryState = () => (dispatch) => {
    dispatch({
        type: 'CATEGORY_STATE_CLEAR',
    });
}
