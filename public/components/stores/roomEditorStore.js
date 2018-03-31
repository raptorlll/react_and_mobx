import {observable, action, createTransformer, computed} from 'mobx';
import roomsStore from './roomsStore';

class RoomEditorStore {
  @observable inProgress = false;
  @observable roomIdentifier = undefined;
  @observable identifier = 0;
  @observable name = '';
  @observable status = 'enabled';
  @observable ancestor = 0;
  /** Initial values */
  @observable errors = {
    name: '',
    status: '',
    ancestor: ''
  };

  @action validateData() {
    let errors = {
      name: '',
      status: '',
      ancestor: ''
    };

    /** There are no validation for a status for a moment */
    if (this.name.length < 4) {
      errors.name = 'You should fill name filed';
    }

    if (!this.ancestor) {
      errors.ancestor = 'You should choose ancestor';
    }

    this.errors = errors;
  }

  @computed get isValid() {
    return !Object.values(this.errors).filter(a => a).length;
  }

  /** Transformer */
  isEnabled = createTransformer(identifier => {
    return this.roomIdentifier === identifier;
  });

  @action setRoomIdentifier(roomIdentifier) {
    if (this.roomIdentifier !== roomIdentifier) {
      this.reset();
      this.roomIdentifier = roomIdentifier;
    }
  }

  static convertStatus(status) {
    return (status === 1) ? 'enabled' : 'disabled';
  }

  @action loadInitialData() {
    if (!this.roomIdentifier)
      return Promise.resolve();

    this.inProgress = true;

    return roomsStore.loadRoom(this.roomIdentifier, {acceptCached: true})
      .then(action((room) => {
        if (!room)
          throw new Error('Can\'t load original room');

        /** set fields */
        this.identifier = room.identifier;
        this.name = room.name;
        this.status = RoomEditorStore.convertStatus(room.status);
        this.ancestor = room.ancestor;
      }))
      .finally(action(() => {
        this.inProgress = false;
      }));
  }

  @action reset() {
    this.identifier = 0;
    this.name = '';
    this.status = 'enabled';
    this.ancestor = 0;
  }

  @action setName(name) {
    this.name = name;
    this.validateData();
  }

  @action setStatus(status) {
    this.status = status;
    this.validateData();
  }

  @action setAncestor(ancestor) {
    this.ancestor = ancestor;
    this.validateData();
  }

  @action setBody(body) {
    this.body = body;
  }

  @action submit() {
    this.validateData();

    if (!this.isValid) {
      return false;
    }

    this.inProgress = true;

    const room = {
      identifier: this.identifier,
      name: this.name,
      status: this.status,
      ancestor: this.ancestor
    };

    return (this.identifier
        ? roomsStore.updateRoom(room)
        : roomsStore.createRoom(room)
    ).catch(action((err) => {
      throw err;
    }))
    .finally(action(() => {
      roomsStore.loadRooms();
      this.inProgress = false;
    }));
  }
}

export default new RoomEditorStore();
