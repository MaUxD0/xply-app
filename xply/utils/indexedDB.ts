// Helper para manejar IndexedDB y guardar posts con comentarios

const DB_NAME = 'xply_db';
const POSTS_STORE = 'posts';
const COMMENTS_STORE = 'comments';
const DB_VERSION = 2; // Incrementamos la versión para agregar la nueva store

// Inicializar la base de datos
const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // Crear el object store de posts si no existe
      if (!db.objectStoreNames.contains(POSTS_STORE)) {
        db.createObjectStore(POSTS_STORE, { keyPath: 'id' });
      }
      
      // Crear el object store de comentarios si no existe
      if (!db.objectStoreNames.contains(COMMENTS_STORE)) {
        const commentsStore = db.createObjectStore(COMMENTS_STORE, { keyPath: 'id', autoIncrement: true });
        commentsStore.createIndex('postId', 'postId', { unique: false });
      }
    };
  });
};

// Guardar posts en IndexedDB
export const savePostsToDB = async (posts: any[]): Promise<void> => {
  try {
    console.log(' Guardando posts en IndexedDB:', posts.length);
    
    const db = await initDB();
    const transaction = db.transaction(POSTS_STORE, 'readwrite');
    const store = transaction.objectStore(POSTS_STORE);

    // Limpiar posts antiguos
    store.clear();


    posts.forEach((post, index) => {
      console.log(`📝 Guardando post ${index + 1}:`, post);
      
      try {
        store.put(post);
        console.log(` Post ${index + 1} guardado exitosamente`);
      } catch (e) {
        console.error(` Error guardando post ${index + 1}:`, e);
        console.error('Post que falló:', post);
      }
    });

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => {
        console.log(' Todos los posts guardados correctamente!');
        db.close();
        resolve();
      };
      transaction.onerror = () => {
        console.error(' Error en transacción:', transaction.error);
        db.close();
        reject(transaction.error);
      };
    });
  } catch (error) {
    console.error(' Error saving posts to IndexedDB:', error);
    throw error;
  }
};

// Cargar posts desde IndexedDB
export const loadPostsFromDB = async (): Promise<any[]> => {
  try {
    const db = await initDB();
    const transaction = db.transaction(POSTS_STORE, 'readonly');
    const store = transaction.objectStore(POSTS_STORE);
    const request = store.getAll();

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        db.close();
        resolve(request.result || []);
      };
      request.onerror = () => {
        db.close();
        reject(request.error);
      };
    });
  } catch (error) {
    console.error('Error loading posts from IndexedDB:', error);
    return [];
  }
};

// Guardar un comentario
export const saveCommentToDB = async (comment: any): Promise<number> => {
  try {
    const db = await initDB();
    const transaction = db.transaction(COMMENTS_STORE, 'readwrite');
    const store = transaction.objectStore(COMMENTS_STORE);
    const request = store.add(comment);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        db.close();
        resolve(request.result as number);
      };
      request.onerror = () => {
        db.close();
        reject(request.error);
      };
    });
  } catch (error) {
    console.error('Error saving comment to IndexedDB:', error);
    throw error;
  }
};

// Cargar comentarios de un post específico
export const loadCommentsFromDB = async (postId: number): Promise<any[]> => {
  try {
    const db = await initDB();
    const transaction = db.transaction(COMMENTS_STORE, 'readonly');
    const store = transaction.objectStore(COMMENTS_STORE);
    const index = store.index('postId');
    const request = index.getAll(postId);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        db.close();
        resolve(request.result || []);
      };
      request.onerror = () => {
        db.close();
        reject(request.error);
      };
    });
  } catch (error) {
    console.error('Error loading comments from IndexedDB:', error);
    return [];
  }
};

// Limpiar todos los posts guardados
export const clearPostsDB = async (): Promise<void> => {
  try {
    const db = await initDB();
    const transaction = db.transaction([POSTS_STORE, COMMENTS_STORE], 'readwrite');
    
    transaction.objectStore(POSTS_STORE).clear();
    transaction.objectStore(COMMENTS_STORE).clear();

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => {
        db.close();
        resolve();
      };
      transaction.onerror = () => {
        db.close();
        reject(transaction.error);
      };
    });
  } catch (error) {
    console.error('Error clearing from IndexedDB:', error);
    throw error;
  }
};
