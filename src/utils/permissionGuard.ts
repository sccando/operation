import store from '@/store/store'

export function permissionGuard(pk: string): boolean{
  let perms = store.state.userInfo.perms;
  let bool = false;
  if(perms && perms.length){
    perms.forEach((item:any) => {
      if(item.key == pk) bool = true
    });
  }
  return bool
}
