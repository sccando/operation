import store from '@/store/store'

export function permissionGuard(pk: string): boolean{
  let perms;
  let storePerms = store.state.perms;
  perms = storePerms.length ? storePerms : JSON.parse(localStorage.getItem('perms_obj'));
  let bool = false;
  if(perms && perms.length){
    perms.forEach((item:any) => {
      if(item.key == pk) bool = true
    });
  }
  return bool
}
