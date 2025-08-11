export const inserCategory = (category, navigate) => async (dispatch) => {
    // const service = new categoryService();

    try {
        console.log('Inserting category:', category);
    } catch (error) {
        console.error('Error inserting category:', error);
    }

    navigate('/categories/list');
}