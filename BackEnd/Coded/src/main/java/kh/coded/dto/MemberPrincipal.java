package kh.coded.dto;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class MemberPrincipal implements UserDetails{
	//Our DB User
		private MemberDTO user;

		//UserDetails
		//private Collection<GrantedAuthority> authorities;
		private boolean locked = false;

		public MemberPrincipal() {
			super();
		}

		public MemberPrincipal(MemberDTO user) {
			super();
			this.user = user;
		}



		@Override
		public Collection<? extends GrantedAuthority> getAuthorities() {
			Collection<GrantedAuthority> collection = new ArrayList<>();
			collection.add(new SimpleGrantedAuthority(Role.USER.getValue()));
			if(this.user.getRole().equals(Role.ADMIN.getValue())) {
				collection.add(new SimpleGrantedAuthority(Role.ADMIN.getValue()));	
			}
//			MemberPrincipal self = this;
//			collection.add(new GrantedAuthority(){
//				@Override
//				public String getAuthority() {
//					return self.user.getRole();
//				}
//			});
			return collection;
		}


		@Override
		public String getPassword() {
			return this.user.getPw();
		}
		@Override
		public String getUsername() {
			return this.user.getUserId();
		}
		/**
		 * 계정 만료 여부
		 * true : 만료 안됨
		 * false : 만료
		 * @return
		 */
		@Override
		public boolean isAccountNonExpired() {
			return true;
		}
		/**
		 * 계정 잠김 여부
		 * true : 잠기지 않음
		 * false : 잠김
		 * @return
		 */
		@Override
		public boolean isAccountNonLocked() {
			return this.locked;
		}
		/**
		 * 비밀번호 만료 여부
		 * true : 만료 안됨
		 * false : 만료
		 * @return
		 */
		@Override
		public boolean isCredentialsNonExpired() {
			return true;
		}
		/**
		 * 사용자 활성화 여부
		 * ture : 활성화
		 * false : 비활성화
		 * @return
		 */
		@Override
		public boolean isEnabled() {
			return !this.locked;
		}
}
