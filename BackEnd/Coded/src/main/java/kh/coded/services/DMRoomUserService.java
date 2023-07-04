package kh.coded.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.coded.dto.DMRoomUserDTO;
import kh.coded.repositories.DMDAO;
import kh.coded.repositories.DMRoomDAO;
import kh.coded.repositories.DMRoomUserDAO;
import kh.coded.repositories.MemberDAO;
import utils.StaticValue;

@Service
public class DMRoomUserService {

	@Autowired
	private MemberDAO memberDAO;
	
	@Autowired
	private DMDAO dmDAO;
	
	@Autowired
	private DMRoomDAO dmRoomDAO;
	
	@Autowired
	private DMRoomUserDAO dmRoomUserDAO;

	public List<DMRoomUserDTO> selectByUserNo(int userNo) {
		return dmRoomUserDAO.selectByUserNo(userNo);
	}
	
	public void deleteUserDMRoomUser(int roomId,int userNo) {
		dmRoomUserDAO.deleteUserDMRoomUser(roomId,userNo);
	}
	
	public List<DMRoomUserDTO> selectByRoomId(int roomId){
		return dmRoomUserDAO.selectByRoomId(roomId);
	}
	
	
	//Admin page 기능
	
	public List<DMRoomUserDTO> selectPagingListByUserNo(int userNo, int cpage){
        int feedCountPerPage = StaticValue.FEEDCOUNTPERSCROLL;
        int endNum = cpage * feedCountPerPage;
        int startNum = endNum - (feedCountPerPage - 1);
        
        return dmRoomUserDAO.selectPagingListByUserNo(userNo, startNum, endNum);
	}
	
	public Map<String, Object> getPageNaviList(int cpage, int userNo){
		//1. 전체 글의 개수
        int recordTotalCount = dmRoomUserDAO.getRecordCountByUserNo(userNo);
        //2. 페이지당 보여줄 글의 개수
        int recordCountPerPage = StaticValue.FEEDCOUNTPERSCROLL;
        //3. 페이지당 보여줄 네비게이터의 수
        int naviCountPerPage = StaticValue.NAVICOUNTPERPAGE;

        //4. 1번과 2번 항목에 의해 총 페이지의 개수가 정해짐.
        //전체 글의 개수를 페이지당
        int pageTotalCount = recordTotalCount % recordCountPerPage > 0 ?
                recordTotalCount / recordCountPerPage + 1
                : recordTotalCount / recordCountPerPage;

        if (cpage < 1) {
            cpage = 1;
        } else if (cpage > pageTotalCount) {
            cpage = pageTotalCount;
        }

        int startNavi = (cpage - 1) / naviCountPerPage * naviCountPerPage + 1;
        int endNavi = startNavi + (naviCountPerPage - 1);

        if (endNavi > pageTotalCount) {
            endNavi = pageTotalCount;
        }

        boolean needPrev = true;
        boolean needNext = true;
        ArrayList<Integer> list = new ArrayList<>();

        if (startNavi == 1) {
            needPrev = false;
        }
        if (endNavi == pageTotalCount) {
            needNext = false;
        }
        for (int i = startNavi; i <= endNavi; i++) {
            list.add(i);
        }

        Map<String, Object> data = new HashMap<>();
        data.put("naviList", list);
        data.put("needPrev", needPrev);
        data.put("needNext", needNext);

        return data;
	}

	public void insertUserToRoom(int loginUserNo,int clickuserNo,  int roomId) {
		dmRoomUserDAO.insertUserToRoom(loginUserNo,clickuserNo,roomId);
		
	}
	
	public int selectAlreadyChat(int loginUserNo,int clickuserNo) {
		return dmRoomUserDAO.selectAlreadyChat(loginUserNo,clickuserNo);
	}

	public void updateDMRead(int roomId, int userNo, int messageId) {
		dmRoomUserDAO.updateDMRead(roomId,userNo,messageId);
		
	}
}
